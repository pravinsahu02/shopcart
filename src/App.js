import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { ThemeProvider } from './components/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import ProductDetails from './components/DetailsProduct';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SellProductPage from './components/SellProductPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/sell" element={<SellProductPage />} />
              </Routes>
            </main>
            <Footer />
            <Analytics />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;