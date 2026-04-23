import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { NAV_ITEMS } from '../../routes/navConfig';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <h3>{user?.name || 'User Name'}</h3>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, hasBadge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <Icon size={20} />
              <span>{label}</span>
              {hasBadge && totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
