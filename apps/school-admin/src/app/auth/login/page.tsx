'use client';

import React, { useState } from 'react';
import styles from './login.module.css';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      
      <div className={styles.glassCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Building2 size={24} />
            </div>
            <h1 className={styles.title}>SchoolMitra ERP</h1>
          </div>
          <p className={styles.subtitle}>Welcome back, Administrator.</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Administrator Email</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={styles.input}
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Authenticating...' : 'Sign In to ERP'}
          </button>
        </form>
      </div>
    </div>
  );
}
