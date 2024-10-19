import React from 'react'
import PropTypes from 'prop-types';
import './productList.css'
import ProductCard from '../productCard/productCard.jsx';
function ProductList({products}) {
  return (
    <div className="product-list">
         {products.map((product) => (<ProductCard  Product={product} />))}
    </div>
  )
}
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default ProductList;