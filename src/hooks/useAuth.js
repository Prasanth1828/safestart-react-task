import { useSelector, useDispatch } from 'react-redux';
import { login as loginAction, logout as logoutAction, signup as signupAction } from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, registeredUsers } = useSelector((state) => state.user);

  const login = (userData) => {
    dispatch(loginAction(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const signup = (userData) => {
    dispatch(signupAction(userData));
  };

  return {
    user,
    isAuthenticated,
    registeredUsers,
    login,
    logout,
    signup,
  };
};
