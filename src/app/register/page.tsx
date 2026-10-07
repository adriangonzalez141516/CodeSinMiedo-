'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
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
      // Check if user previously completed the onboarding test on this device
      let localProfile = null;
      try {
        const saved = localStorage.getItem('user_learning_profile');
        if (saved) localProfile = JSON.parse(saved);
      } catch (err) {
        // ignore
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            ...(localProfile ? { learning_profile: localProfile } : {})
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message || 'Error al registrarse');
        setLoading(false);
        return;
      }

      // If Supabase didn't start session automatically, attempt instant sign in
      if (!data.session) {
        await supabase.auth.signInWithPassword({
          email,
          password
        });
      }

      // Redirect immediately to the Onboarding learning profile & plans test!
      router.push('/onboarding');
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
          <span style={{ fontSize: '2.5rem' }}>🎯</span>
          <h1 className={styles.title} style={{ marginTop: '0.5rem' }}>Crea tu cuenta</h1>
          <p className={styles.subtitle}>
            Regístrate para descubrir tu <strong>perfil de aprendizaje</strong> y adaptar todos los cursos a tu mente.
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Nombre Completo</label>
            <input
              className={styles.input}
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta y Definir mi Perfil →'}
          </button>
        </form>

        <div className={styles.link} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          ¿Ya tienes una cuenta? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
