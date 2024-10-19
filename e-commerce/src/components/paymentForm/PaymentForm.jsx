import React, { useState } from 'react';

const PaymentForm = ({ onSubmit, onBack }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation if necessary
    onSubmit(paymentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Expiration Date:</label>
        <input
          type="text"
          name="expirationDate"
          value={paymentData.expirationDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={paymentData.cvv}
          onChange={handleChange}
          required
        />
      </div>
      <button type="button" onClick={onBack}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

export default PaymentForm;
