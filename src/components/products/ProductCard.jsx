import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product, onAdd }) => {
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="category-badge">{product.category}</div>
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <h3>{product.name}</h3>
          <div className="rating">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>4.8</span>
          </div>
        </div>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <button 
            className="add-btn"
            onClick={() => onAdd(product)}
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
