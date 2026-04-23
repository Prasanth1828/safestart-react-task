import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="cart-page">
      <header className="page-header">
        <h1>Shopping Cart</h1>
      </header>
      <motion.div 
        className="empty-cart"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="empty-cart-icon">
          <ShoppingBag size={40} />
        </div>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/products" className="continue-shopping">
          Start Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
