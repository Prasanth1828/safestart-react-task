import { useState, Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import PageLoader from '../ui/PageLoader';
import './Layout.css';

const Layout = () => {
  const { totalQuantity } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="layout-container">
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      <main className="main-content">
        <header className="top-nav">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="top-nav-spacer"></div>
          
          <Link to="/cart" className="cart-action-btn" onClick={closeMobileMenu}>
            <ShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className="cart-action-badge">{totalQuantity}</span>
            )}
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="page-wrapper"
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
