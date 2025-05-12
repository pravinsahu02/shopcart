import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          ShopCart
        </Link>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>
        <div className="navbar-links hide-sm">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          <Link to="/cart" className="navbar-link navbar-cart">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link to="/sell" className="navbar-link">
            Sell
          </Link>
          <button onClick={toggleTheme} className="btn btn-outline btn-sm">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        <button className="navbar-toggle show-sm" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <div className="navbar-mobile-menu show-sm">
            <Link to="/" className="navbar-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/products" className="navbar-link" onClick={toggleMenu}>
              Products
            </Link>
            <Link to="/cart" className="navbar-link navbar-cart" onClick={toggleMenu}>
              Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link to="/sell" className="navbar-link" onClick={toggleMenu}>
              Sell
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="btn btn-outline btn-sm"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;