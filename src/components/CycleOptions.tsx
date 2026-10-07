'use client';

import { useState, KeyboardEvent } from 'react';

export default function CycleOptions() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, step: 'Paso 01', title: 'Micro-video', desc: '< 10 minutos al grano', icon: '🎬' },
    { id: 2, step: 'Paso 02', title: 'Apunte escrito', desc: 'Con ejemplos de uso', icon: '📖' },
    { id: 3, step: 'Paso 03', title: 'Práctica guiada', desc: 'Retos para ti', icon: '💻' },
    { id: 4, step: 'Paso 04', title: 'Video Solución', desc: 'Aprende a razonar', icon: '💡' }
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab((prev) => (prev % tabs.length) + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveTab((prev) => (prev === 1 ? tabs.length : prev - 1));
    }
  };

  return (
    <div className="glass-panel cycle-wrapper">
      <style>{`
        .cycle-wrapper {
          margin-top: 3rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .cycle-tablist {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 1.5rem;
        }
        .cycle-tab-btn {
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          display: flex;
          gap: 0.85rem;
          align-items: center;
          transition: var(--transition-smooth);
          color: var(--text-secondary);
          min-height: 48px;
        }
        .cycle-tab-btn:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .cycle-tab-btn.active {
          background: transparent;
          color: var(--text-primary);
        }
        .cycle-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          border: 2px solid var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          background: transparent;
          flex-shrink: 0;
          transition: var(--transition-smooth);
        }
        .cycle-tab-btn.active .cycle-icon-box {
          border-color: var(--primary);
          background: transparent;
          box-shadow: none;
        }
        /* Active underline */
        .cycle-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
        }
        .cycle-tab-btn {
          position: relative;
        }
        .cycle-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .cycle-mockup-container {
          background: #0a0a0e;
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          min-height: 320px;
          display: flex;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          width: 100%;
        }

        @media (max-width: 900px) {
          .cycle-tablist {
            grid-template-columns: repeat(2, 1fr);
          }
          .cycle-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 520px) {
          .cycle-wrapper {
            padding: 1.25rem;
          }
          .cycle-tablist {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .cycle-tab-btn {
            padding: 0.85rem;
          }
        }
      `}</style>

      {/* Top Row: Responsive accessible Tabs */}
      <div 
        role="tablist" 
        aria-label="Fases del ciclo de aprendizaje 4 en 1" 
        className="cycle-tablist"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`cycle-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`cycle-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`cycle-tab-btn ${isActive ? 'active' : ''}`}
            >
              <div className="cycle-icon-box" aria-hidden="true">
                {tab.icon}
              </div>
              
              <div style={{ overflow: 'hidden' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: isActive ? 'var(--primary)' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {tab.step}
                </span>
                <strong style={{ display: 'block', fontSize: '1rem', color: isActive ? 'var(--text-primary)' : 'inherit', marginTop: '2px' }}>
                  {tab.title}
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {tab.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Content: 2-Column Responsive Layout */}
      <div 
        role="tabpanel"
        id={`cycle-panel-${activeTab}`}
        aria-labelledby={`cycle-tab-${activeTab}`}
        tabIndex={0}
        className="cycle-content-grid animate-fade-in" 
        key={activeTab}
      >
        {/* Left Column: Text & Features */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '0.3rem 1rem', 
            background: 'rgba(99, 102, 241, 0.1)', 
            color: 'var(--primary)', 
            borderRadius: '99px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            width: 'fit-content'
          }}>
            {activeTab === 1 && '🎬 Paso 1: Concepto ultra-focalizado'}
            {activeTab === 2 && '📖 Paso 2: Lectura y repaso activo'}
            {activeTab === 3 && '💻 Paso 3: Hora de escribir código'}
            {activeTab === 4 && '💡 Paso 4: Corrección y razonamiento'}
          </span>
          
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem', lineHeight: '1.25' }}>
            {activeTab === 1 && 'Micro-video conceptual ultra focalizado'}
            {activeTab === 2 && 'Apuntes claros para no perderte nada'}
            {activeTab === 3 && 'Prácticas reales para asimilar conceptos'}
            {activeTab === 4 && 'Te enseñamos a pensar como programador'}
          </h3>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
            {activeTab === 1 && 'No damos clases de una hora donde te saturas a los 10 minutos. Explicamos un solo concepto por lección mediante metáforas cotidianas que cualquiera entiende a la primera.'}
            {activeTab === 2 && 'Repasa el concepto sin tener que ver el video completo otra vez. Incluye resúmenes ejecutivos, código comentado y esquemas de memoria listos para consultar.'}
            {activeTab === 3 && 'La programación se consolida escribiendo. Te proponemos retos progresivos dentro del navegador para que ganes soltura sin miedo al error.'}
            {activeTab === 4 && 'Aquí ocurre el verdadero aprendizaje: un video detallado donde desgranamos el porqué de cada línea, los errores típicos y las buenas prácticas.'}
          </p>

          {/* Features Checkmarks */}
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-primary)', flexWrap: 'wrap' }}>
            {activeTab === 1 && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Calidad Full HD
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Múltiples perspectivas
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Sin tecnicismos vacíos
                </span>
              </>
            )}
            {activeTab === 2 && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Descargables en PDF
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Glosario de términos
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Copia código en 1 clic
                </span>
              </>
            )}
            {activeTab === 3 && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Editor en el navegador
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Pistas graduales
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Feedback inmediato
                </span>
              </>
            )}
            {activeTab === 4 && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Análisis paso a paso
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Buenas prácticas
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> Alternativas de solución
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Mockup Panel */}
        <div className="cycle-mockup-container" aria-label={`Demostración visual de ${tabs[activeTab - 1].title}`}>
          {activeTab === 1 && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.85rem 1.25rem', background: '#13151b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.15)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
                  ● Lección 1.4
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>08:45 min</span>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem', textAlign: 'center' }}>
                <div 
                  tabIndex={0}
                  role="button"
                  aria-label="Reproducir demostración"
                  style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', cursor: 'pointer', boxShadow: '0 0 25px var(--primary-glow)' }}
                >
                  <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid white', marginLeft: '4px' }}></div>
                </div>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Variables y Tipos de Datos</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Explicado con cajas etiquetadas</span>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div style={{ width: '100%', height: '100%', background: '#111318', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>📑</span> Resumen de concepto
              </div>
              <div style={{ width: '65%', height: '16px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }}></div>
              <div style={{ width: '95%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}></div>
              <div style={{ width: '85%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}></div>
              
              <div style={{ marginTop: '0.5rem', padding: '1.25rem', background: '#000', borderLeft: '3px solid var(--primary)', borderRadius: '0 8px 8px 0', fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0', overflowX: 'auto' }}>
                <span style={{ color: 'var(--secondary)' }}>int</span> <span style={{ color: 'var(--text-primary)' }}>edad</span> = <span style={{ color: 'var(--success)' }}>25</span>; <span style={{ color: '#64748b' }}>// Caja para guardar un número</span>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div style={{ width: '100%', height: '100%', background: '#0a0a0e', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '0.75rem 1rem', background: '#13151b', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontFamily: 'monospace' }}>Main.java</span>
                <span style={{ color: 'var(--success)', fontSize: '0.75rem' }}>● Listo para ejecutar</span>
              </div>
              <div style={{ padding: '1.25rem', flex: 1, fontFamily: 'monospace', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.7', overflowX: 'auto' }}>
                <span style={{ color: '#64748b' }}>1</span> <span style={{ color: 'var(--secondary)' }}>public class</span> Main &#123;<br/>
                <span style={{ color: '#64748b' }}>2</span> &nbsp; <span style={{ color: 'var(--secondary)' }}>public static void</span> main(String[] args) &#123;<br/>
                <span style={{ color: '#64748b' }}>3</span> &nbsp; &nbsp; <span style={{ color: '#64748b' }}>// Reto: asigna 100 a puntuacion</span><br/>
                <span style={{ color: '#64748b' }}>4</span> &nbsp; &nbsp; <span style={{ color: 'var(--secondary)' }}>int</span> puntuacion = <span style={{ color: 'var(--success)' }}>100</span>;<br/>
                <span style={{ color: '#64748b' }}>5</span> &nbsp; &#125;<br/>
                <span style={{ color: '#64748b' }}>6</span> &#125;
              </div>
              <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#111318', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ padding: '0.4rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ▶ Compilar y probar
                </span>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }} aria-hidden="true">🧑‍🏫</div>
              <strong style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Resolución comentada en video</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', marginBottom: '1.25rem' }}>
                Comprueba si tu solución es óptima y entiende cómo razona un desarrollador profesional.
              </p>
              <div 
                tabIndex={0}
                role="button"
                aria-label="Ver video con la solución explicada"
                style={{ width: '52px', height: '52px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid var(--success)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
              >
                <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid white', marginLeft: '3px' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
