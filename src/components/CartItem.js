import { useCart } from './CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, convertToINR } = useCart();

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{convertToINR(item.price)}</p>
        <div className="cart-item-actions">
          <div className="quantity-control">
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;