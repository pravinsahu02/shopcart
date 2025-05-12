import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(83.5); // Fallback fixed rate (USD to INR)

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

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Convert price to INR
  const convertToINR = (usdPrice) => {
    const inrPrice = usdPrice * exchangeRate;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(inrPrice);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="alert alert-warning">Product not found</div>;

  return (
    <div className="product-details">
      <div className="product-details-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-details-image"
        />
      </div>
      <div className="product-details-info">
        <h1 className="product-details-title">{product.title}</h1>
        <div className="product-details-meta">
          <span className="product-details-category">{product.category}</span>
          <div className="product-details-rating">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </div>
        </div>
        <p className="product-details-price">{convertToINR(product.price)}</p>
        <p className="product-details-description">{product.description}</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => addToCart({ ...product, price: product.price * exchangeRate })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;