import NavBar from './components/navBar/navBar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import HomePage from './components/homePage/HomePage';
import ProductList from './components/productList/productList';
import ProductDetails from './components/orderDetails/OrderDetails';
import Cart from './components/cart/cart';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Checkout from './components/checkout/Checkout';
import UserProfile from './components/userProfile/UserProfile';
import OrderDetails from './components/orderDetails/OrderDetails'; // Ensure this is the correct import
import AdminDashboard from './components/adminDashbord/AdminDashbord';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

const products = [
  // Example products array
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  // Add more products as needed
];

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage products={products} />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/checkout" element={<ProtectedRoute component={Checkout} />} />
        <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
        <Route path="/order/:orderId" element={<ProtectedRoute component={OrderDetails} />} />

        {/* Admin Route */}
        <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;