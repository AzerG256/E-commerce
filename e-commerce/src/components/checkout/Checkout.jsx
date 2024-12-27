import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShippingForm from '../shippingForm/ShippingForm';
import PaymentForm from '../paymentForm/PaymentForm';
import OrderSummary from '../orderSummary/OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [errors, setErrors] = useState({});

  const validateShippingData = (data) => {
    return data.fullName && data.address && data.city && /^[0-9]{5}(-[0-9]{4})?$/.test(data.postalCode);
  };

  const validatePaymentData = (data) => {
    return (
      /^\d{16}$/.test(data.cardNumber) &&
      /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(data.expirationDate) &&
      /^\d{3}$/.test(data.cvv)
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateShippingData(shippingData)) {
        setErrors({ shipping: 'Please provide valid shipping information.' });
        return;
      }
    }

    if (currentStep === 2) {
      if (!validatePaymentData(paymentData)) {
        setErrors({ payment: 'Please provide valid payment information.' });
        return;
      }
    }

    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleOrderSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
    const orderData = {
      user: userId,
      products: cartItems.map(item => ({ productId: item.product._id, quantity: item.quantity })),
      totalAmount: totalPrice,
      shippingAddress: shippingData,
      status: 'Processing',
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      console.log('Order created successfully:', data);
      navigate('/', { state: { order: data.order } });
    } catch (err) {
      console.error('Error creating order:', err);
      setErrors({ order: err.message || 'An error occurred while creating the order' });
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-progress">
        <p>Step {currentStep} of 3</p>
      </div>
      {currentStep === 1 && (
        <>
          <ShippingForm onSubmit={setShippingData} errors={errors.shipping} />
          {errors.shipping && <div className="error-message">{errors.shipping}</div>}
          <button onClick={handleNextStep}>Next</button>
        </>
      )}
      {currentStep === 2 && (
        <>
          <PaymentForm onSubmit={setPaymentData} errors={errors.payment} />
          {errors.payment && <div className="error-message">{errors.payment}</div>}
          <button onClick={handleNextStep}>Next</button>
        </>
      )}
      {currentStep === 3 && (
        <OrderSummary
          cartItems={cartItems}
          totalPrice={totalPrice}
          shippingData={shippingData}
          paymentData={paymentData}
          onConfirm={handleOrderSubmit}
          onBack={handlePrevStep}
        />
      )}
      <div className="checkout-navigation">
        {currentStep > 1 && <button onClick={handlePrevStep}>Back</button>}
      </div>
      {errors.order && <div className="error-message">{errors.order}</div>}
    </div>
  );
};

export default Checkout;