import { useState } from 'react';
import { useCart } from './CartContext';

const SellProductForm = () => {
  const { exchangeRate } = useCart();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
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
    setSuccessMessage('');
    // Mock API call
    setTimeout(() => {
      // Store in localStorage
      const newProduct = {
        id: `user-${Date.now()}`, // Unique ID for user-added products
        title: formData.title,
        price: parseFloat(formData.price) / exchangeRate, // Convert INR to USD for consistency
        description: formData.description,
        image: formData.image,
        category: formData.category,
        rating: { rate: 0, count: 0 }, // Default rating
      };
      const existingProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      localStorage.setItem('userProducts', JSON.stringify([...existingProducts, newProduct]));
      setSuccessMessage('Product added successfully! Add another product below.');
      setFormData({ title: '', price: '', description: '', image: '', category: '' });
      setErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
  };

  return (
    <form className="sell-product-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Add New Product</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="form-group">
        <label className="form-label">Product Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="text-danger">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
        />
        {errors.price && <p className="text-danger">{errors.price}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="text-danger">{errors.description}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          type="url"
          name="image"
          className="form-control"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="text-danger">{errors.image}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        {errors.category && <p className="text-danger">{errors.category}</p>}
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  );
};

export default SellProductForm;