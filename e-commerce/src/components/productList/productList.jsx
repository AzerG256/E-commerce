import React from 'react';
import PropTypes from 'prop-types';
import './productList.css';
import ProductCard from '../productCard/productCard.jsx';
function ProductList({ products, onAddToCart }) {
  if (!products.length) {
    return <p>No products available.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string, // Make this optional
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
;
