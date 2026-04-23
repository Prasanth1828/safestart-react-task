import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterConfig = () => {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '12px 20px',
          fontSize: '0.95rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        success: {
          iconTheme: {
            primary: 'var(--accent)',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default ToasterConfig;
