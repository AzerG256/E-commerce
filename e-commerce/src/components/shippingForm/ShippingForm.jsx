import React, { useState } from 'react';
import './ShippingForm.css'; // Import CSS

const ShippingForm = ({ onSubmit, errors }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onSubmit({ ...formData, [name]: value }); // Pass data to parent in real-time
  };

  return (
    <div className="shipping-form">
      <h2>Shipping Information</h2>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        {errors?.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        {errors?.address && <span className="error-message">{errors.address}</span>}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors?.city && <span className="error-message">{errors.city}</span>}
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        {errors?.postalCode && (
          <span className="error-message">{errors.postalCode}</span>
        )}
      </div>
      <div>
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Other">Other</option>
        </select>
        {errors?.country && <span className="error-message">{errors.country}</span>}
      </div>
    </div>
  );
};

export default ShippingForm;
