import React, { useState, useEffect } from 'react';
import ProductList from '../productList/productList';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// add products to cart
const onAddToCart = async (product) => {
  try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ productId: product.id, quantity: 1 }) // Assuming quantity is 1 by default
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Failed to add product to cart.');
      }

      console.log('Product added to cart:', data);
      alert('Product added to cart!');
  } catch (error) {
      console.error('Error adding product to cart:', error);
      alert(error.message);
  }
};



  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Update URL if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on sortOrder
  const sortAndFilterProducts = () => {
    const sorted = [...products].sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Sort products whenever the sort order changes
  useEffect(() => {
    sortAndFilterProducts();
  }, [products, sortOrder]);


  // Handle loading and error states
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <ProductList products={filteredProducts} onAddToCart={onAddToCart} />
    </div>
  );
};

export default HomePage;
