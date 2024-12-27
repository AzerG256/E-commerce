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
import OrderDetails from './components/orderDetails/OrderDetails';
import AdminDashboard from './components/adminDashbord/AdminDashbord';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Route>

        {/* Admin Route */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
