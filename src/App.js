import React, { Component } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: [],
    };
  }

  handleFilter = (e) => {
    if (e.target.value === "") {
      this.setState({ size: e.target.value, products: data.products });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  handleSort = (e) => {
    let sort = e.target.value;
    this.setState((prevState) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  handleRemoveFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((a) => a._id !== product._id),
    });
  };

  handleAddToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="#">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.handleFilter}
                sortProducts={this.handleSort}
              />
              <Products
                products={this.state.products}
                addToCart={this.handleAddToCart}
              />
            </div>
            <div className="sidebar-content">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.handleRemoveFromCart}
              />
            </div>
          </div>
        </main>
        <footer>All rights reserved.</footer>
      </div>
    );
  }
}

export default App;
