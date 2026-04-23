import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '../../store/slices/userSlice';
import { signupSchema } from '../../utils/validationSchemas';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './Signup.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registeredUsers } = useSelector((state) => state.user);
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {

    const userExists = registeredUsers.some((u) => u.email === data.email);
    if (userExists) {
      setError('Email already registered');
      toast.error('This email is already registered.');
      return;
    }

    dispatch(signup({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: ''
    }));

    toast.success('Account created successfully! Please sign in.');

    navigate('/');
  };

  return (
    <div className="signup-container">
      <motion.div 
        className="signup-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signup-header">
          <div className="logo-icon">
            <UserPlus size={32} color="white" />
          </div>
          <h1>Create Account</h1>
          <p>Join us to start managing your products</p>
        </div>

        {error && (
          <motion.div 
            className="error-message" 
            style={{ marginBottom: '1.5rem', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.8rem', borderRadius: '8px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form" noValidate>
          <div className="input-group">
            <label>Full Name</label>
            <div className={`input-wrapper ${errors.name ? 'error' : ''}`}>
              <User size={18} className="icon" />
              <input 
                type="text" 
                placeholder="John Doe"
                {...register('name')}
              />
            </div>
            {errors.name && <span className="error-text">{errors.name.message}</span>}
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
              <Mail size={18} className="icon" />
              <input 
                type="email" 
                placeholder="email@example.com"
                {...register('email')}
                onChange={() => setError('')}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
              <Lock size={18} className="icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                {...register('password')}
              />
            </div>
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
              <Lock size={18} className="icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
          </div>

          <button 
            type="submit" 
            className="signup-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/"><span>Sign In</span></Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
