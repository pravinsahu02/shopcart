import { useCart } from './CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;