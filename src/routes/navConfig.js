import { User, Package, ShoppingCart } from 'lucide-react';

export const NAV_ITEMS = [
  { to: '/products', label: 'Product List', icon: Package },
  { to: '/cart', label: 'My Cart', icon: ShoppingCart, hasBadge: true },
  { to: '/profile', label: 'Profile Page', icon: User },
];
