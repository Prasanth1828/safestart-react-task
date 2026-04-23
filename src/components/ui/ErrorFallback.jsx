import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        position: 'relative',
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        padding: '3rem 2.5rem',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
          backgroundColor: '#ef4444',
          filter: 'blur(40px)',
          opacity: 0.4,
          zIndex: -1
        }} />

        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <AlertCircle size={36} color="#ef4444" />
        </div>

        <h1 style={{ 
          fontSize: '2.2rem', 
          fontWeight: '800', 
          color: 'white', 
          marginBottom: '1rem',
          letterSpacing: '-0.02em'
        }}>
          Oops! Something broke.
        </h1>

        <p style={{ 
          color: '#94a3b8', 
          marginBottom: '2.5rem', 
          lineHeight: '1.7',
          fontSize: '1.05rem'
        }}>
          We encountered an unexpected error. Don't worry, your data is safe. 
          You can try refreshing the page or returning home.
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2.5rem',
            fontSize: '0.85rem',
            color: '#ef4444',
            fontFamily: 'monospace',
            textAlign: 'left',
            borderLeft: '4px solid #ef4444',
            overflowX: 'auto'
          }}>
            <strong>Error:</strong> {error.message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={resetErrorBoundary}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1.1rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: '700',
              boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <RotateCcw size={20} />
            Try Again
          </button>

          <button
            onClick={() => window.location.href = '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
          >
            <Home size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
