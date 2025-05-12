import CartSummary from './CartSummary';
import CheckoutForm from './CheckOutForm';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="checkout-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checking out</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="cart-container">
          <CheckoutForm />
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;