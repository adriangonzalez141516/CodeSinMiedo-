'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LEARNING_PROFILES, LearningProfile } from '@/data/onboardingData';
import styles from './perfil.module.css';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeProfileId, setActiveProfileId] = useState<'visual' | 'tecnico' | 'realista'>('visual');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user || null;
        setUser(currentUser);

        // Try to read profile from user metadata or localStorage
        let profileId: 'visual' | 'tecnico' | 'realista' = 'visual';

        if (currentUser?.user_metadata?.learning_profile?.profileId) {
          profileId = currentUser.user_metadata.learning_profile.profileId;
        } else {
          try {
            const localSaved = localStorage.getItem('user_learning_profile');
            if (localSaved) {
              const parsed = JSON.parse(localSaved);
              if (parsed?.profileId && (parsed.profileId === 'visual' || parsed.profileId === 'tecnico' || parsed.profileId === 'realista')) {
                profileId = parsed.profileId;
              }
            }
          } catch (e) {
            // ignore JSON error
          }
        }

        setActiveProfileId(profileId);
      } catch (err) {
        console.error('Error loading session in profile', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectProfile = async (newId: 'visual' | 'tecnico' | 'realista') => {
    setActiveProfileId(newId);
    setIsUpdating(true);
    setSaveSuccessMsg('');

    const profileData = LEARNING_PROFILES[newId];
    const profilePayload = {
      profileId: profileData.id,
      profileTitle: profileData.title,
      explanationType: profileData.explanationType,
      updatedAt: new Date().toISOString()
    };

    // 1. Save to localStorage immediately so course video prioritization activates instantly
    try {
      localStorage.setItem('user_learning_profile', JSON.stringify(profilePayload));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }

    // 2. If logged in, update Supabase user metadata
    if (user) {
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            learning_profile: profilePayload
          }
        });
        if (error) {
          console.error('Error saving profile to Supabase user metadata', error);
        }
      } catch (err) {
        console.error('Unexpected error updating Supabase user', err);
      }
    }

    setIsUpdating(false);
    setSaveSuccessMsg(`¡Estilo actualizado a ${profileData.title}! Las lecciones se adaptarán a este enfoque.`);
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4500);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <main className={styles.wrapper}>
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid var(--bg-accent)', borderTopColor: 'var(--primary)', animation: 'spin 1s infinite linear', margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Cargando perfil...</p>
        </div>
      </main>
    );
  }

  // Guest state (not logged in)
  if (!user) {
    return (
      <main className={styles.wrapper}>
        <div className={styles.guestCard}>
          <div className={styles.guestIcon}>👤</div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
              Tu Perfil de Alumno
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '420px', lineHeight: 1.5, margin: 0 }}>
              Inicia sesión o crea tu cuenta para guardar tu progreso en los cursos, sincronizar tu estilo de aprendizaje y acceder a tus lecciones.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '360px' }}>
            <Link href="/login" className="btn btn-secondary" style={{ flex: 1, minWidth: '130px', textAlign: 'center' }}>
              Iniciar Sesión
            </Link>
            <Link href="/register" className="btn btn-primary" style={{ flex: 1, minWidth: '130px', textAlign: 'center' }}>
              Registrarse
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', width: '100%' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0' }}>
              ¿Aún no sabes cuál es tu estilo de aprendizaje?
            </p>
            <Link href="/onboarding" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>
              🎯 Hacer el Test Pedagógico
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentProfile = LEARNING_PROFILES[activeProfileId];
  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : (user.email ? user.email.charAt(0).toUpperCase() : 'U');

  const registeredDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    : 'Reciente';

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* User Hero Bar */}
        <section className={styles.userHeaderCard} aria-label="Información del usuario">
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {userInitials}
            </div>

            <div className={styles.userDetails}>
              <h1 className={styles.userName}>
                {user.user_metadata?.full_name || 'Estudiante'}
              </h1>
              <div className={styles.userEmail}>
                {user.email}
              </div>

              <div className={styles.userBadges}>
                <span className={styles.badgePrimary}>
                  {currentProfile.icon} {currentProfile.title}
                </span>
                <span className={styles.badgeSuccess}>
                  ✓ Alumno Activo
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>
                  Miembro desde {registeredDate}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary"
              style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.35)' }}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </section>

        {/* Success notification banner */}
        {saveSuccessMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399', borderRadius: '14px', padding: '0.9rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.65rem', animation: 'fadeIn 0.3s ease' }}>
            <span>✓</span>
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Two Columns Grid */}
        <div className={styles.gridTwoCol}>
          
          {/* Column 1: Learning Style / Pedagogical Profile Customizer */}
          <section className={styles.card} aria-labelledby="learning-style-title">
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleWrap}>
                <span className={styles.cardIcon}>🧠</span>
                <h2 id="learning-style-title" className={styles.cardTitle}>
                  Estilo de Aprendizaje
                </h2>
              </div>

              <Link
                href="/onboarding"
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.8rem', borderRadius: '99px' }}
              >
                🔄 Repetir Test
              </Link>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
              Determina cómo se te presentan por defecto las lecciones y explicaciones de cada tema. Puedes cambiarlo en cualquier momento:
            </p>

            {/* 3 Styles Selector */}
            <div className={styles.styleSelectorGrid} role="radiogroup" aria-label="Seleccionar estilo de aprendizaje">
              {(['visual', 'tecnico', 'realista'] as const).map(styleKey => {
                const profile = LEARNING_PROFILES[styleKey];
                const isSelected = activeProfileId === styleKey;

                return (
                  <button
                    key={styleKey}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectProfile(styleKey)}
                    className={`${styles.styleOption} ${isSelected ? styles.styleOptionActive : ''}`}
                    disabled={isUpdating}
                  >
                    <span className={styles.styleIcon}>{profile.icon}</span>
                    <span className={styles.styleName}>{profile.title.replace('Desarrollador ', '')}</span>
                    <span className={styles.styleTag}>{profile.tag}</span>
                    {isSelected && (
                      <span className={styles.styleActiveBadge}>✓ Activo</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation of active profile */}
            <div className={styles.infoBox}>
              <span style={{ fontSize: '1.25rem' }}>✨</span>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Configuración de tu visor:</strong>{' '}
                {currentProfile.priorityAdvice}
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💡</span>
              <span>Dentro de cada lección podrás seguir alternando entre las 3 perspectivas con 1 clic.</span>
            </div>
          </section>

          {/* Column 2: Course & Plan Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Active Course Card */}
            <section className={styles.card} aria-labelledby="active-course-title">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <span className={styles.cardIcon}>☕</span>
                  <h2 id="active-course-title" className={styles.cardTitle}>
                    Curso en Progreso
                  </h2>
                </div>
                <span className={styles.badgePrimary}>Nivel 0</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 0.35rem 0', color: 'var(--text-primary)' }}>
                  Java Zero to Hero: Programación Orientada a Objetos
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Aprende POO desde cero con explicaciones adaptadas a tu mente.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  <span>Progreso del temario</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>3 / 8 Lecciones</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: '38%' }} />
                </div>
              </div>

              <Link
                href="/courses/java-zero-to-hero"
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center', minHeight: '44px', fontWeight: 700 }}
              >
                🚀 Continuar Lección
              </Link>
            </section>

            {/* Membership / Subscription Card */}
            <section className={styles.card} aria-labelledby="membership-title">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                  <span className={styles.cardIcon}>👑</span>
                  <h2 id="membership-title" className={styles.cardTitle}>
                    Tu Plan
                  </h2>
                </div>
                <span className={styles.badgePrimary}>Acceso Activo</span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Tienes acceso completo al catálogo grabado y al visor adaptativo de lecciones.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>✓ Acceso a todas las explicaciones (Visual, Técnico y Práctico)</li>
                <li>✓ Retos de código y prácticas guiadas</li>
                <li>✓ Canal de dudas asíncrono en plataforma</li>
              </ul>

              <Link
                href="/#precios"
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'center', fontSize: '0.85rem', padding: '0.6rem' }}
              >
                Ver opciones de tutorías y mentoría 1 a 1
              </Link>
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
