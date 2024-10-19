import React, { useState } from 'react';
import ShippingForm from '../shippingForm/ShippingForm';
import PaymentForm from '../paymentForm/PaymentForm';
import OrderSummary from '../orderSummary/OrderSummary';
import './Checkout.css';

const Checkout = ({ cartItems, totalPrice }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    handleNextStep();
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    handleNextStep();
  };

  return (
    <div className="checkout-container">
      {currentStep === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
      {currentStep === 2 && (
        <PaymentForm
          onSubmit={handlePaymentSubmit}
          onBack={handlePrevStep}
        />
      )}
      {currentStep === 3 && (
        <OrderSummary
          cartItems={cartItems}
          totalPrice={totalPrice}
          shippingData={shippingData}
          paymentData={paymentData}
          onConfirm={() => alert('Order confirmed!')}
          onBack={handlePrevStep}
        />
      )}
    </div>
  );
};

export default Checkout;
