import React from 'react';
import { motion } from 'framer-motion';
import { PackageCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="order-success-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="success-icon-wrapper">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <PackageCheck size={80} color="var(--accent)" />
        </motion.div>
      </div>
      <h1>Order Placed!</h1>
      <p>Thank you for your purchase. Your items will be shipped shortly.</p>
      <div className="order-details-mini">
        <div className="detail-item">
          <span>Order ID:</span>
          <strong>#SS-{Math.floor(Math.random() * 1000000)}</strong>
        </div>
        <div className="detail-item">
          <span>Status:</span>
          <strong style={{ color: 'var(--accent)' }}>Processing</strong>
        </div>
      </div>
      <button className="checkout-btn" onClick={() => navigate('/products')}>
        <ArrowRight size={20} />
        <span>Back to Products</span>
      </button>
    </motion.div>
  );
};

export default OrderSuccess;
