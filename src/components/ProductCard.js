import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  // Generate rating stars
  const rating = product.rating?.rate || 0;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(rating) ? 'star filled' : 'star'}>
      ★
    </span>
  ));

  return (
    <div className="product-card">
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <div className="product-rating">{stars} ({product.rating?.count || 0})</div>
        <p className="product-description">
          {product.description?.substring(0, 100)}...
        </p>
        <div className="product-price">₹{product.price.toFixed(2)}</div>
        <div className="product-actions">
          <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to={`/products/${product.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
    </div>
  );
};

export default ProductCard;