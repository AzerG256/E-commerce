import React from 'react'
import './productCard.css'
function ProductCard({Product}) {
  return (
    <div class="product-card">
    <div class="product-image">
        <img src={Product.image} alt={Product.name}></img>
    </div>
    <div class="product-details">
        <h3 class="product-title">{Product.name}</h3>
        <p class="product-description">{Product.description}</p>
        <p class="product-price">{Product.price}</p>
        <button class="add-to-cart-btn">Add to Cart</button>
    </div>
</div>

  )
}

export default ProductCard;