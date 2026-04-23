import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const addToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (id) => {
    dispatch(removeItem(id));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    emptyCart,
  };
};
