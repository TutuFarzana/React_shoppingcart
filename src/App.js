import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";

const pages = {
  PRODUCT_LIST: "PRODUCT_LIST",
  CART_LIST: "CART_LIST"
};

let currentPage = pages.PRODUCT_LIST;
const products = [
  {url : "https://s3.amazonaws.com/marquee-test-akiaisur2rgicbmpehea/NDwUWtlCRoegtF4zgten_pyramid.jpg", id: 1, name: "The Alchemist", price: 299, individualCount : 0},
  
  {url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9vJpuFEcpnK-Ve07hxLb8XhSA47HQIUyqD8aY9Ah5WPmRUtSoA", id: 2, name: "The Kite Runner", price: 499, individualCount : 0},
  
  {url : "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/DVD_Cover_of_Malgudi_Days.jpeg/250px-DVD_Cover_of_Malgudi_Days.jpeg", id: 3, name: "Malgudi Days", price: 399, individualCount : 0},
  
  {url: "https://images.gr-assets.com/books/1436217001l/9777.jpg", id: 4, name: "The God of Small Things", price: 599, individualCount : 0},
  
  {url : "https://d3525k1ryd2155.cloudfront.net/h/230/706/1101706230.0.b.jpg", id: 5, name: "The God Created the Integers", price: 899, individualCount : 0},
];

const AddToCart = ({message, onClick}) => (
  <button className = "add-to-cart-button" onClick = {onClick}>
    {message} 
  </button>
);

const cart = [];
var quantity = 0;
var subTotal = 0;

const addToCart = Id => {
  quantity ++;
  products[Id - 1].individualCount ++;
  subTotal = subTotal + products[Id-1].price;
  if (products[Id - 1].individualCount == 1)
  {
    const [product] = products.filter(({ id }) => Id === id);
    cart.push(product);
  }
  renderApp();
}

const goToCart = () => {
  currentPage = pages.CART_LIST;
  renderApp();
}

const AddToCartButton = ({ message, onClick }) => (
  <button className="add-to-cart-btn" onClick={onClick}>
    {message}
  </button>
);

const Product = ({ url, id, name, price, individualCount}) => (
  <div className = "product-div">
    <img className = "image" src = {url} alt = {name}></img> <br />
    {name} <br />
    {price} <br />
    <AddToCartButton message="Add to cart" onClick={addToCart.bind(null, id)}/>
  </div>
  
);

const Cart = ({ id, name, price, individualCount }) => (
  <li className="cart">
    <div className="display-book">{name} </div>
    <div className="display-price">{price} </div>
    <div className="display-count">{individualCount}</div>
  </li>
);

const ProductList = () => (
  <React.Fragment>
    <ul className = "product-list">
      {products.map(product => <Product {...product} />)}
    </ul>
  </React.Fragment>
);

const CartList = () => (
  <React.Fragment>
    <h2>Cart List</h2>
    
    <ul className = "cart-list">
        <li>
          <strong>
            <div className="display-book">BOOK NAME</div>
            <div className="display-price">PRICE</div>
            <div className="display-count">QUANTITY</div>
          </strong>
        </li>
      {cart.map((cartItem => <Cart {...cartItem} />
      ))}
    </ul>
    <div>
      <span>Subtotal: </span>
      <strong>
       {subTotal}
      </strong>
    </div>
  </React.Fragment>
);

const renderApp = () => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
};

const App = () => (
  <div className="App">
    
      <img className = "header-image" src="https://bookstore.dal.ca/theme/img/logo@2x.png"/>
      <img className="goto-cart-btn" src="https://cdn3.iconfinder.com/data/icons/ikooni-flat-online-shopping/128/shopping-14-512.png" width = "80px" height = "80px" onClick={goToCart}/>
      <p className = "total-count">{`${quantity}`}</p>
    
    {currentPage === pages.PRODUCT_LIST ? <ProductList /> : <CartList />}
 
   
  </div>
);

export default App;
 renderApp();