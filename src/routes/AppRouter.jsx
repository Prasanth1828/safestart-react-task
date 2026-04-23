import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PublicRoute from '../components/auth/PublicRoute';
import Layout from '../components/layout/Layout';
import PageLoader from '../components/ui/PageLoader';

const Login = lazy(() => import('../pages/Login/Login'));
const Signup = lazy(() => import('../pages/Signup/Signup'));
const Products = lazy(() => import('../pages/Products/Products'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Cart = lazy(() => import('../pages/Cart/Cart'));

const AppRouter = createBrowserRouter([
  {
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <PublicRoute />
          </Suspense>
        ),
        children: [
          { path: '/', element: <Login /> },
          { path: '/signup', element: <Signup /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: '/products', element: <Products /> },
              { path: '/cart', element: <Cart /> },
              { path: '/profile', element: <Profile /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default AppRouter;
