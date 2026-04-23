import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import OrderSuccess from '../../components/cart/OrderSuccess';
import EmptyCart from '../../components/cart/EmptyCart';
import './Cart.css';

const Cart = () => {
  const { items, totalAmount, totalQuantity, addToCart, removeFromCart, emptyCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    emptyCart();
    toast.success('Order placed successfully!', { icon: '🎉' });
  };

  if (isOrdered) {
    return (
      <div className="cart-page">
        <OrderSuccess />
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-page">
      <header className="page-header">
        <h1>Shopping Cart</h1>
        <p>You have {totalQuantity} items in your cart.</p>
      </header>

      <div className="cart-container">
        <div className="cart-items-section">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onAdd={addToCart} 
                onRemove={removeFromCart} 
              />
            ))}
          </AnimatePresence>
        </div>

        <CartSummary 
          totalAmount={totalAmount} 
          onPlaceOrder={handlePlaceOrder} 
        />
      </div>
    </div>
  );
};

export default Cart;
