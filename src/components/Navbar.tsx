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
          <Link href="/" className="nav-brand" aria-label="DevProfesor - Inicio" onClick={closeMobileMenu}>
            <span className="text-gradient">Code</span>SinMiedo
          </Link>

          {/* Desktop Navigation Links */}
          <div className="nav-desktop-links">
            <Link href="/onboarding" className={`nav-link ${pathname === '/onboarding' ? 'active' : ''}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
              🎯 Test de Estilo
            </Link>
            <Link href="/#metodologia" className="nav-link">Metodología</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
            <Link href="/#precios" className="nav-link">Precios</Link>
            <Link href="/contacto" className={`nav-link ${pathname === '/contacto' ? 'active' : ''}`}>Contacto</Link>

            {user ? (
              <>
                <Link href={`/courses/${courseId}`} className="btn btn-primary" style={{ minHeight: '40px', padding: '0.6rem 1.4rem', fontSize: '0.92rem' }}>
                  Mis Cursos
                </Link>
                <button onClick={handleSignOut} className="btn btn-secondary" style={{ minHeight: '40px', padding: '0.6rem 1.4rem', fontSize: '0.92rem' }}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary" style={{ minHeight: '40px', padding: '0.6rem 1.4rem', fontSize: '0.92rem' }}>
                  Entrar
                </Link>
                <Link href="/register" className="btn btn-primary" style={{ minHeight: '40px', padding: '0.6rem 1.4rem', fontSize: '0.92rem' }}>
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="nav-mobile-controls">
            {!user ? (
              <Link href="/login" className="btn btn-secondary nav-mobile-cta">Entrar</Link>
            ) : (
              <Link href={`/courses/${courseId}`} className="btn btn-primary nav-mobile-cta">Cursos</Link>
            )}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="nav-hamburger-btn"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown">
            <div className="container nav-mobile-menu-inner">
              <Link href="/onboarding" className="nav-mobile-link" style={{ color: 'var(--primary)', fontWeight: 700 }} onClick={closeMobileMenu}>
                🎯 Test de Estilo (Descubre tu perfil)
              </Link>
              <Link href="/#metodologia" className="nav-mobile-link" onClick={closeMobileMenu}>Metodología</Link>
              <Link href="/#faq" className="nav-mobile-link" onClick={closeMobileMenu}>Preguntas Frecuentes</Link>
              <Link href="/#precios" className="nav-mobile-link" onClick={closeMobileMenu}>Precios y Planes</Link>
              <Link href="/contacto" className={`nav-mobile-link ${pathname === '/contacto' ? 'active' : ''}`} onClick={closeMobileMenu}>Contacto con el Profesor</Link>
              <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {user ? (
                  <>
                    <Link href={`/courses/${courseId}`} className="btn btn-primary" style={{ width: '100%', minHeight: '44px' }} onClick={closeMobileMenu}>Mis Cursos</Link>
                    <button onClick={() => { handleSignOut(); closeMobileMenu(); }} className="btn btn-secondary" style={{ width: '100%', minHeight: '44px' }}>Cerrar Sesión</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn btn-secondary" style={{ width: '100%', minHeight: '44px' }} onClick={closeMobileMenu}>Iniciar Sesión</Link>
                    <Link href="/register" className="btn btn-primary" style={{ width: '100%', minHeight: '44px' }} onClick={closeMobileMenu}>Crear Cuenta Libre</Link>
                  </>
                )}
              </div>
            </div>
          </div>
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
          gap: 1.25rem;
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
          gap: 0.75rem;
        }

        .nav-mobile-cta {
          min-height: 36px;
          padding: 0.4rem 0.9rem;
          font-size: 0.85rem;
        }

        .nav-hamburger-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
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
        }

        .nav-mobile-dropdown {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
          padding: 1rem 0 1.5rem 0;
          animation: slideDown 0.25s ease-out;
        }

        .nav-mobile-menu-inner {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-mobile-link {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition-smooth);
        }

        .nav-mobile-link:hover {
          color: var(--text-primary);
          background: var(--bg-accent);
        }

        .nav-mobile-link.active {
          color: var(--primary);
          font-weight: 600;
          background: rgba(99, 102, 241, 0.1);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none;
          }
          .nav-mobile-controls {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
