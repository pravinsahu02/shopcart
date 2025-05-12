import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';

const CheckoutForm = () => {
  const { cart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(83.5); // Fallback rate

  // Fetch exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(response.data.rates.INR);
      } catch (err) {
        console.warn('Failed to fetch exchange rate, using fallback:', err.message);
      }
    };
    fetchExchangeRate();
  }, []);

  // Convert price to INR
  const convertToINR = (usdPrice) => {
    const inrPrice = usdPrice * exchangeRate;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(inrPrice);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.match(/^\d{5}$/)) newErrors.zip = 'Valid ZIP code is required';
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Valid card number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', address: '', city: '', zip: '', cardNumber: '' });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Checkout</h2>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-danger">{errors.address}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <p className="text-danger">{errors.city}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">ZIP Code</label>
        <input
          type="text"
          name="zip"
          className="form-control"
          value={formData.zip}
          onChange={handleChange}
        />
        {errors.zip && <p className="text-danger">{errors.zip}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          className="form-control"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        {errors.cardNumber && <p className="text-danger">{errors.cardNumber}</p>}
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : `Place Order (${convertToINR(cartTotal)})`}
      </button>
    </form>
  );
};

export default CheckoutForm;