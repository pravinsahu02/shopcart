import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const CartSummary = () => {
  const { cart, cartTotal, convertToINR } = useCart();

  const subtotal = cartTotal;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="cart-summary">
      <h3 className="cart-summary-title">Order Summary</h3>
      <div className="cart-summary-row">
        <span>Subtotal</span>
        <span>{convertToINR(subtotal)}</span>
      </div>
      <div className="cart-summary-row">
        <span>Tax (10%)</span>
        <span>{convertToINR(tax)}</span>
      </div>
      <div className="cart-summary-total">
        <span>Total</span>
        <span>{convertToINR(total)}</span>
      </div>
      <Link to="/checkout" className="btn btn-primary btn-block">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;