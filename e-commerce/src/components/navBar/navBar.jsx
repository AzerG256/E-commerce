import React from 'react'
import './navBar.css'

const NavBar = () => {
  return (
    <>
    <nav class="navbar">
     <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="/cart">Shopping Cart</a></li>
        <li><a href="/profile">Account</a></li>
      </ul>
    </nav></>
  )
}

export default NavBar;