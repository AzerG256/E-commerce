import React, { useState, useEffect } from 'react';
import ProductCard from '../productCard/productCard';
import './HomePage.css'; // Optional: Create a CSS file for styling

const HomePage = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('asc');
  const productsPerPage = 5; // Number of products to display per page

  // Define sortAndFilterProducts outside of useEffect, so it can be used elsewhere
  const sortAndFilterProducts = () => {
    let sortedProducts = [...products];

    // Sort products based on sortOrder state
    sortedProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // useEffect to sort products whenever the products or sortOrder changes
  useEffect(() => {
    sortAndFilterProducts();
  }, [products, sortOrder]); // Add products and sortOrder to the dependency array

  return (
    <div className="homepage">
      <h1>Product List</h1>

      {/* Sort Dropdown */}
      <div className="sort-options">
        <label htmlFor="sort">Sort by Price: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} Product={product} />
        ))}
      </div>

      {/* Pagination or other logic can go here */}
    </div>
  );
};

export default HomePage;

