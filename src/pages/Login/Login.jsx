import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validationSchemas';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const { login, registeredUsers } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const user = registeredUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      login({
        name: user.name,
        email: user.email,
        avatar: user.avatar || ''
      });
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/products');
    } else {
      setLoginError('Invalid email or password');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="logo-icon">
            <LogIn size={32} color="white" />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        {loginError && (
          <motion.div 
            className="error-message" 
            style={{ marginBottom: '1.5rem', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.8rem', borderRadius: '8px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={16} />
            <span>{loginError}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
          <div className="input-group">
            <label>Email Address</label>
            <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
              <Mail size={18} className="icon" />
              <input 
                type="email" 
                placeholder="email@example.com"
                {...register('email')}
                onChange={() => setLoginError('')}
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.email && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.email.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
              <Lock size={18} className="icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                {...register('password')}
                onChange={() => setLoginError('')}
              />
            </div>
            <AnimatePresence mode="wait">
              {errors.password && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={14} />
                  <span>{errors.password.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup"><span>Sign Up</span></Link></p>
        </div>

        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <div className="credential-row">
            <span>Email:</span> <strong>admin@safestart.com</strong>
          </div>
          <div className="credential-row">
            <span>Pass:</span> <strong>123456</strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
