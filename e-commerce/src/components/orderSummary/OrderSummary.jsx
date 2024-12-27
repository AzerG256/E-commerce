import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({
  cartItems,
  totalPrice,
  shippingData,
  paymentData,
  onConfirm,
  onBack,
}) => {
  console.log('OrderSummary Props:', { cartItems, totalPrice, shippingData, paymentData });

  if (!cartItems || !shippingData || !paymentData) {
    console.log('Missing Data:', { cartItems, shippingData, paymentData });
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Summary</h2>

      {/* Shipping Information */}
      <div>
        <h3>Shipping Information</h3>
        <p>{shippingData.fullName}</p>
        <p>{shippingData.address}</p>
        <p>{shippingData.city}, {shippingData.postalCode}</p>
        <p>{shippingData.country}</p>
      </div>

      {/* Payment Information */}
      <div>
        <h3>Payment Information:</h3>
        <p>Card Number: **** **** **** {paymentData.cardNumber.slice(-4)}</p>
        <p>Expiration Date: {paymentData.expirationDate}</p>
      </div>

      {/* Cart Items */}
      <div>
        <h3>Items in Cart:</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.product._id}>{item.product.name}</li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <div>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>

      <button type="button" onClick={onBack}>
        Back
      </button>
      <button type="button" onClick={onConfirm}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;