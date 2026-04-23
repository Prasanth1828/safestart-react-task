import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
    >
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="price">{formatPrice(item.price)}</p>
      </div>
      <div className="quantity-controls">
        <button className="qty-btn" onClick={() => onRemove(item.id)}>
          {item.quantity === 1 ? <Trash2 size={16} color="#ef4444" /> : <Minus size={16} />}
        </button>
        <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
        <button className="qty-btn" onClick={() => onAdd(item)}>
          <Plus size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
