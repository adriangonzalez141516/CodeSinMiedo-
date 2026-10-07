'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Course } from '@/mocks/db';
import { useLessonContext, EXPLANATION_MODES } from './LessonContext';

export function LessonLayoutClient({
  course,
  children
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { selectedExplanation, setSelectedExplanation, setLiveAnnouncement } = useLessonContext();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarCloseRef = useRef<HTMLButtonElement>(null);

  // Find active lesson dynamically based on URL (without re-fetching)
  let activeLesson = null;
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      if (pathname.includes(`/lessons/${mod.id}/${les.id}`)) {
        activeLesson = les;
        break;
      }
    }
  }

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => sidebarCloseRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (dropdownOpen) {
          setDropdownOpen(false);
        } else if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen, menuOpen]);

  // Auto-prioritize student's learning style from onboarding profile
  useEffect(() => {
    if (typeof window === 'undefined' || !activeLesson?.alternativeExplanations) return;
    try {
      const savedProfile = localStorage.getItem('user_learning_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed?.explanationType) {
          const matchIndex = activeLesson.alternativeExplanations.findIndex(
            (alt: any) => alt.type === parsed.explanationType
          );
          if (matchIndex !== -1) {
            setSelectedExplanation(matchIndex);
          }
        }
      }
    } catch (e) {
      // Ignore localStorage read errors
    }
  }, [activeLesson?.id]);

  const handleStyleChange = (index: number) => {
    setSelectedExplanation(index);
    setDropdownOpen(false);
    const styleName = index === -1 ? 'Principal' : (activeLesson?.alternativeExplanations?.[index]?.type || 'Alternativo');
    setLiveAnnouncement(`Enfoque de explicación actualizado a: ${styleName}`);
  };

  const currentExplanationInfo = selectedExplanation === -1
    ? EXPLANATION_MODES.main
    : (EXPLANATION_MODES[activeLesson?.alternativeExplanations?.[selectedExplanation]?.type || 'main'] || EXPLANATION_MODES.main);

  return (
    <>
      <a href="#workspace-content" className="skip-link">
        Saltar al contenido de la lección
      </a>

      <style>{`
        .platform-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
        }

        .sidebar {
          width: 300px;
          min-width: 300px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 120;
          height: 100%;
        }

        .sidebar-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .sidebar-close-btn {
          display: none;
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }
        .sidebar-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .lesson-link {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: var(--transition-smooth);
          border: 1px solid transparent;
          min-height: 44px;
        }
        .lesson-link:hover {
          background: var(--bg-accent);
          color: var(--text-primary);
        }
        .lesson-link.active {
          background: var(--primary-glow);
          color: #ffffff;
          font-weight: 600;
          border-color: rgba(99, 102, 241, 0.4);
        }

        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 110;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .overlay.open {
          display: block;
          opacity: 1;
          pointer-events: auto;
        }

        .main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          min-width: 0;
        }

        .topbar {
          position: relative;
          z-index: 100;
          height: 70px;
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          gap: 1rem;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
          flex: 1;
        }

        .hamburger-btn {
          display: none;
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-smooth);
        }
        .hamburger-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .topbar-breadcrumb {
          font-size: 0.9rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dropdown-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .style-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          min-height: 44px;
          transition: var(--transition-smooth);
        }
        .style-trigger-btn:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .dropdown-menu-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          max-width: calc(100vw - 2rem);
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          box-shadow: 0 16px 40px var(--glass-shadow);
          z-index: 1000;
        }

        .dropdown-menu-header {
          padding: 0.5rem 0.75rem 0.35rem 0.75rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 0.35rem;
        }

        .style-option-btn {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
          background: transparent;
          border: none;
          border-left: 3px solid transparent;
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          transition: var(--transition-smooth);
          min-height: 44px;
        }
        .style-option-btn:hover {
          background: var(--bg-accent);
        }
        .style-option-btn.selected {
          background: var(--primary-glow);
          border-left: 3px solid var(--primary);
        }

        @media (max-width: 900px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-close-btn {
            display: inline-flex;
          }
          .hamburger-btn {
            display: inline-flex;
          }
          .topbar {
            padding: 0 1rem;
          }
        }

        @media (max-width: 520px) {
          .topbar {
            height: 64px;
            min-height: 64px;
          }
          .topbar-breadcrumb {
            max-width: 140px;
            font-size: 0.8rem;
          }
          .style-trigger-btn {
            padding: 0.4rem 0.75rem;
            font-size: 0.8rem;
          }
          .style-label-desktop {
            display: none;
          }
        }
      `}</style>

      <div className="platform-container">
        {/* Backdrop for mobile sidebar */}
        <div 
          className={`overlay ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar: Course Index */}
        <aside 
          id="course-sidebar"
          className={`sidebar ${menuOpen ? 'open' : ''}`}
          aria-label="Temario completo del curso"
        >
          <div className="sidebar-header">
            <Link 
              href={`/courses/${course.id}`} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              ← <span style={{ textDecoration: 'underline' }}>Volver al curso</span>
            </Link>

            <button
              ref={sidebarCloseRef}
              className="sidebar-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar temario"
            >
              ✕
            </button>
          </div>

          <div style={{ padding: '1rem 1.5rem 0.5rem 1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {course.title}
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>
              {course.level}
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Módulos y lecciones">
            {course.modules.map((mod) => (
              <div key={mod.id} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.75px', fontWeight: 700 }}>
                  {mod.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {mod.lessons.map((les) => {
                    const isActive = activeLesson?.id === les.id;
                    return (
                      <Link
                        key={les.id}
                        href={`/courses/${course.id}/lessons/${mod.id}/${les.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`lesson-link ${isActive ? 'active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span aria-hidden="true" style={{ fontSize: '0.9rem' }}>
                          {isActive ? '▶' : '○'}
                        </span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {les.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="main-area">
          {/* Topbar */}
          <header className="topbar">
            <div className="topbar-left">
              <button
                ref={menuButtonRef}
                className="hamburger-btn"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="course-sidebar"
                aria-label="Abrir temario del curso"
              >
                ☰
              </button>
              <div className="topbar-breadcrumb">
                <span style={{ color: 'var(--text-secondary)' }}>Módulo / </span>
                <strong style={{ color: 'var(--text-primary)' }}>{activeLesson?.title || 'Cargando...'}</strong>
              </div>
            </div>

            {/* Learning Style Dropdown Selector */}
            {activeLesson && (
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <button
                  className="style-trigger-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-label={`Enfoque didáctico actual: ${currentExplanationInfo.label}. Pulsa para cambiar.`}
                >
                  <span aria-hidden="true">{currentExplanationInfo.icon}</span>
                  <span className="style-label-desktop" style={{ color: 'var(--text-secondary)' }}>Enfoque:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{currentExplanationInfo.label}</strong>
                  <span aria-hidden="true" style={{ fontSize: '0.65rem', marginLeft: '0.2rem', color: 'var(--text-secondary)' }}>▼</span>
                </button>

                {dropdownOpen && (
                  <div 
                    className="dropdown-menu-panel animate-fade-in" 
                    role="listbox"
                    aria-label="Opciones de enfoque pedagógico"
                  >
                    <div className="dropdown-menu-header">
                      Adaptar forma de explicar
                    </div>

                    <button
                      role="option"
                      aria-selected={selectedExplanation === -1}
                      className={`style-option-btn ${selectedExplanation === -1 ? 'selected' : ''}`}
                      onClick={() => handleStyleChange(-1)}
                    >
                      <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🎯</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Principal (Estándar)</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                          La explicación base paso a paso con analogías familiares.
                        </div>
                      </div>
                    </button>

                    {activeLesson.alternativeExplanations?.map((alt, idx) => {
                      const modeMeta = EXPLANATION_MODES[alt.type] || {
                        label: alt.type,
                        icon: '💡',
                        summary: alt.description
                      };
                      const isSelected = selectedExplanation === idx;
                      return (
                        <button
                          key={idx}
                          role="option"
                          aria-selected={isSelected}
                          className={`style-option-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleStyleChange(idx)}
                        >
                          <span style={{ fontSize: '1.25rem' }} aria-hidden="true">{modeMeta.icon}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{modeMeta.label}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                              {alt.description || modeMeta.summary}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </header>

          {children}
        </div>
      </div>
    </>
  );
}
