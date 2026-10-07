'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      // Check if user has an existing learning profile
      const userProfile = data.user?.user_metadata?.learning_profile;
      let localProfile = null;
      try {
        const saved = localStorage.getItem('user_learning_profile');
        if (saved) localProfile = JSON.parse(saved);
      } catch (err) {
        // ignore
      }

      // If user metadata had a profile but not in localStorage, sync it
      if (userProfile && !localProfile) {
        localStorage.setItem('user_learning_profile', JSON.stringify(userProfile));
      }

      if (!userProfile && !localProfile) {
        router.push('/onboarding');
      } else {
        router.push('/courses/java-zero-to-hero');
      }
      router.refresh();
    } catch (err) {
      setError('Ocurrió un error inesperado');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '2.5rem' }}>👋</span>
          <h1 className={styles.title} style={{ marginTop: '0.5rem' }}>Bienvenido de nuevo</h1>
          <p className={styles.subtitle}>Ingresa a tu cuenta de CodeSinMiedo</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Entrar a mi Cuenta'}
          </button>
        </form>

        <div className={styles.link} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          ¿No tienes una cuenta? <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}
