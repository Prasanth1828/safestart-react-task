import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const CartSummary = ({ totalAmount, onPlaceOrder }) => {
  return (
    <div className="summary-section">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(totalAmount)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span style={{ color: 'var(--accent)' }}>Free</span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>{formatPrice(0)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatPrice(totalAmount)}</span>
      </div>

      <button className="checkout-btn" onClick={onPlaceOrder}>
        <CheckCircle size={20} />
        <span>Place Order</span>
      </button>

      <Link to="/products" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <span>Continue Shopping</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default CartSummary;
