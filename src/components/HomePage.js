import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import ProductSkeleton from './ProductSkeleton';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from Fake Store API
        const response = await axios.get('https://fakestoreapi.com/products');
        const apiProducts = response.data;
        // Fetch user-added products from localStorage
        const userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
        // Combine products
        const allProducts = [...apiProducts, ...userProducts];
        setFeaturedProducts(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="home-page">
      <Hero />
      <section className="section" id="featured">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="products-grid">
              {[...Array(12)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-content">
                <h2>No Products Available</h2>
                <p>Add products to see them here!</p>
                <a href="/sell" className="btn btn-primary">
                  Sell a Product
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;