import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <header className="page-header">
        <h1>User Profile</h1>
        <p>Manage your account settings and preferences.</p>
      </header>

      <div style={{
        backgroundColor: 'var(--bg-card)',
        padding: '2.5rem',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        maxWidth: '600px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white'
          }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user?.name || 'PRASANTH R'}</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
            <Mail size={20} color="var(--text-muted)" />
            <span>{user?.email || 'prasanth@example.com'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
            <Shield size={20} color="var(--text-muted)" />
            <span>Administrator Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
