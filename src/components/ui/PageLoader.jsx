import React from 'react';

const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: 'var(--bg-dark)',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    letterSpacing: '0.05em'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div className="loader-spinner" style={{ 
        width: '30px', 
        height: '30px', 
        border: '2px solid var(--border)', 
        borderTopColor: 'var(--primary)', 
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <span>LOADING...</span>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default PageLoader;
