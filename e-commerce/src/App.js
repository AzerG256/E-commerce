import NavBar from './components/navBar/navBar';
import Footer from './components/Footer/Footer';
import ProductList from './components/productList/productList';
import Cart from './components/cart/cart';
import HomePage from './components/homePage/HomePage';
import Checkout from './components/checkout/Checkout';
import { useState } from 'react';
function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is the first product.",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/250"
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the second product.",
      price: 39.99,
      quantity: 2,
      image: "https://via.placeholder.com/250"
    },
  ]);

  return (
    <>
    <NavBar/>
    <Checkout cartItems={cartItems}/>
    <Footer/>
    </>
  )
}

export default App;