import React, { useState } from 'react';
import './PaymentForm.css'; // Import CSS

const PaymentForm = ({ onSubmit, errors }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onSubmit({ ...formData, [name]: value }); // Pass data to parent in real-time
  };

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        {errors?.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
      </div>
      <div>
        <label>Expiration Date:</label>
        <input
          type="text"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          required
        />
        {errors?.expirationDate && (
          <span className="error-message">{errors.expirationDate}</span>
        )}
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          required
        />
        {errors?.cvv && <span className="error-message">{errors.cvv}</span>}
      </div>
    </div>
  );
};

export default PaymentForm;
