const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">ShopCart</h3>
            <p className="footer-description">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/products" className="footer-link">Products</a></li>
              <li><a href="/cart" className="footer-link">Cart</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-links-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;