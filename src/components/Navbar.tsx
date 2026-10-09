'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface NavbarProps {
  courseId?: string;
}

export default function Navbar({ courseId = 'java-zero-to-hero' }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMobileMenu();
    router.push('/');
    router.refresh();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header role="banner" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <nav className="navbar" aria-label="Navegación principal">
        <div className="container nav-container">
          <Link href="/" className="nav-brand" aria-label="CodeSinMiedo - Inicio" onClick={closeMobileMenu}>
            <span className="text-gradient">Code</span>SinMiedo
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-desktop-links">
            <Link href="/#metodologia" className="nav-link">Metodología</Link>
            <Link href="/#precios" className="nav-link">Precios</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
            <Link href="/contacto" className={`nav-link ${pathname === '/contacto' ? 'active' : ''}`}>Contacto</Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: '0.5rem' }}>
                <Link href="/perfil" className={`nav-link ${pathname === '/perfil' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>👤</span> Mi Perfil
                </Link>
                <Link href={`/courses/${courseId}`} className="btn btn-primary" style={{ minHeight: '40px', padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}>
                  🎓 Mis Cursos
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className="btn btn-secondary" 
                  style={{ minHeight: '40px', padding: '0.55rem 1.1rem', fontSize: '0.88rem', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                  title="Cerrar sesión"
                >
                  🚪 Salir
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: '0.5rem' }}>
                <Link href="/login" className="btn btn-secondary" style={{ minHeight: '40px', padding: '0.55rem 1.2rem', fontSize: '0.9rem' }}>
                  Entrar
                </Link>
                <Link href="/register" className="btn btn-primary" style={{ minHeight: '40px', padding: '0.55rem 1.3rem', fontSize: '0.9rem' }}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="nav-mobile-controls">
            {!user ? (
              <Link href="/login" className="btn btn-secondary nav-mobile-cta" onClick={closeMobileMenu}>Entrar</Link>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Link href={`/courses/${courseId}`} className="btn btn-primary nav-mobile-cta" onClick={closeMobileMenu}>Cursos</Link>
                <button 
                  onClick={handleSignOut} 
                  className="nav-mobile-logout-btn" 
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  Salir
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="nav-hamburger-btn"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <>
            <div className="nav-mobile-backdrop" onClick={closeMobileMenu} />
            <div className="nav-mobile-dropdown">
              <div className="nav-mobile-drawer">
                {/* Logged in User Card in Drawer */}
                {user && (
                  <div className="nav-user-status-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div className="nav-user-avatar">
                        {user.email ? user.email.charAt(0).toUpperCase() : '👤'}
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Sesión activa:</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {user.user_metadata?.full_name || user.email}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="nav-user-logout-pill"
                    >
                      🚪 Salir
                    </button>
                  </div>
                )}

                <div className="nav-mobile-section-title">Navegación</div>

                {user && (
                  <Link href="/perfil" className={`nav-mobile-link ${pathname === '/perfil' ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>👤 Mi Perfil de Alumno</span>
                    <span className="arrow-indicator">›</span>
                  </Link>
                )}

                <Link href="/#metodologia" className="nav-mobile-link" onClick={closeMobileMenu}>
                  <span>💡 Metodología Didáctica</span>
                  <span className="arrow-indicator">›</span>
                </Link>

                <Link href="/#precios" className="nav-mobile-link" onClick={closeMobileMenu}>
                  <span>🏷️ Precios y Planes</span>
                  <span className="arrow-indicator">›</span>
                </Link>

                <Link href="/#faq" className="nav-mobile-link" onClick={closeMobileMenu}>
                  <span>❓ Preguntas Frecuentes</span>
                  <span className="arrow-indicator">›</span>
                </Link>

                <Link href="/contacto" className={`nav-mobile-link ${pathname === '/contacto' ? 'active' : ''}`} onClick={closeMobileMenu}>
                  <span>✉️ Contacto con el Profesor</span>
                  <span className="arrow-indicator">›</span>
                </Link>

                <div className="nav-mobile-divider" />

                {/* Account Actions */}
                <div className="nav-mobile-auth-actions">
                  {user ? (
                    <>
                      <Link href="/perfil" className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', fontSize: '0.95rem' }} onClick={closeMobileMenu}>
                        👤 Ver Mi Perfil
                      </Link>
                      <Link href={`/courses/${courseId}`} className="btn btn-primary" style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }} onClick={closeMobileMenu}>
                        🎓 Entrar a Mis Cursos
                      </Link>
                      <button 
                        onClick={handleSignOut} 
                        className="btn btn-secondary" 
                        style={{ width: '100%', minHeight: '44px', fontSize: '0.95rem', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                      >
                        🚪 Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/register" className="btn btn-primary" style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }} onClick={closeMobileMenu}>
                        🚀 Crear Cuenta Gratis
                      </Link>
                      <Link href="/login" className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', fontSize: '0.95rem' }} onClick={closeMobileMenu}>
                        Iniciar Sesión
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <style jsx>{`
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }

        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          color: var(--primary);
          font-weight: 600;
        }

        .nav-mobile-controls {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-mobile-cta {
          min-height: 38px;
          padding: 0.45rem 0.9rem;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .nav-mobile-logout-btn {
          min-height: 38px;
          padding: 0.45rem 0.75rem;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 99px;
          border: 1px solid rgba(239, 68, 68, 0.4);
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-mobile-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .nav-hamburger-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--bg-accent);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-hamburger-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--primary);
        }

        /* Mobile Backdrop Overlay */
        .nav-mobile-backdrop {
          position: fixed;
          top: 65px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 105;
        }

        /* Mobile Dropdown Drawer */
        .nav-mobile-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          width: 100%;
          background: var(--bg-secondary);
          border-bottom: 2px solid var(--glass-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
          z-index: 110;
          max-height: calc(100vh - 72px);
          overflow-y: auto;
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-mobile-drawer {
          display: flex !important;
          flex-direction: column !important;
          padding: 1.25rem 1.25rem 2rem 1.25rem;
          gap: 0.65rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .nav-user-status-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }

        .nav-user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .nav-user-logout-pill {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 99px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-mobile-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.75px;
          color: var(--text-secondary);
          margin-top: 0.5rem;
          margin-bottom: 0.15rem;
          padding-left: 0.5rem;
        }

        .nav-mobile-highlight-link {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(236, 72, 153, 0.12) 100%);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 14px;
          padding: 0.9rem 1.1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          transition: var(--transition-smooth);
          margin-bottom: 0.25rem;
        }

        .nav-mobile-highlight-link:hover {
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .nav-mobile-link {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.1rem;
          border-radius: 12px;
          font-size: 0.98rem;
          font-weight: 500;
          color: var(--text-primary);
          background: var(--bg-accent);
          border: 1px solid transparent;
          transition: var(--transition-smooth);
          text-decoration: none;
        }

        .nav-mobile-link:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--glass-border);
        }

        .nav-mobile-link.active {
          color: var(--primary);
          font-weight: 600;
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.12);
        }

        .arrow-indicator {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1;
        }

        .nav-mobile-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 0.5rem 0;
          width: 100%;
        }

        .nav-mobile-auth-actions {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-mobile-controls {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
