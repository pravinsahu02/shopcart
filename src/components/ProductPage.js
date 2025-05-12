import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductGrid from './ProductGrid';
import ProductSkeleton from './ProductSkeleton';
import { useCart } from './CartContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const location = useLocation();
  const { convertToINR } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from Fake Store API
        const response = await axios.get('https://fakestoreapi.com/products');
        const apiProducts = response.data;
        // Fetch user-added products from localStorage
        const userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
        // Combine products
        const allProducts = [...apiProducts, ...userProducts];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }

    if (category) {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    if (sort === 'price-low') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      updatedProducts.sort((a, b) => b.price - b.price);
    } else if (sort === 'rating') {
      updatedProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(updatedProducts);
  }, [category, sort, location.search, products]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="product-page">
      <section className="section">
        <div className="container">
          <h2 className="section-title">All Products</h2>
          <div className="product-filters">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelry</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sort By</label>
              <select
                className="form-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="products-grid">
              {[...Array(12)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
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

export default ProductPage;