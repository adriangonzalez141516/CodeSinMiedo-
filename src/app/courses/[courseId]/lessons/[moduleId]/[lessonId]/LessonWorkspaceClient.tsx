'use client';

import { useState } from 'react';
import { Lesson } from '@/mocks/db';
import { useLessonContext, EXPLANATION_MODES } from '../../LessonContext';

export function LessonWorkspaceClient({ lesson }: { lesson: Lesson }) {
  const { selectedExplanation, setSelectedExplanation, setLiveAnnouncement } = useLessonContext();

  const [activeMode, setActiveMode] = useState<'video' | 'apuntes' | 'practica' | 'solucion'>('video');
  const [codeCopied, setCodeCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const handleTabChange = (mode: 'video' | 'apuntes' | 'practica' | 'solucion') => {
    setActiveMode(mode);
    const modeNames = {
      video: 'Video Conceptual',
      apuntes: 'Apuntes',
      practica: 'Práctica Guiada',
      solucion: 'Solución'
    };
    setLiveAnnouncement(`Pestaña cambiada a ${modeNames[mode]}`);
  };

  const handleStyleChange = (index: number) => {
    setSelectedExplanation(index);
    const styleName = index === -1 ? 'Principal' : (lesson.alternativeExplanations?.[index]?.type || 'Alternativo');
    setLiveAnnouncement(`Enfoque de explicación actualizado a: ${styleName}`);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCodeCopied(true);
    setLiveAnnouncement('Código copiado al portapapeles');
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTerminalOutput(null);
    setLiveAnnouncement('Ejecutando código...');
    setTimeout(() => {
      setIsRunningCode(false);
      setTerminalOutput('✔ Compilación exitosa en 0.42s\n> Salida: ¡Variable puntuacion = 100 creada correctamente!\n> Test superado: 1/1 completado.');
      setLiveAnnouncement('Código ejecutado con éxito. Test superado.');
    }, 900);
  };

  const currentExplanationInfo = selectedExplanation === -1
    ? EXPLANATION_MODES.main
    : (EXPLANATION_MODES[lesson.alternativeExplanations?.[selectedExplanation]?.type || 'main'] || EXPLANATION_MODES.main);

  const currentExplanationBlocks = selectedExplanation === -1
    ? lesson.contentBlocks
    : lesson.alternativeExplanations?.[selectedExplanation]?.contentBlocks;

  const tabs = [
    { id: 'video', label: '1. Video Conceptual', shortLabel: 'Video', icon: '🎬' },
    { id: 'apuntes', label: '2. Apuntes', shortLabel: 'Apuntes', icon: '📖' },
    { id: 'practica', label: '3. Práctica Guiada', shortLabel: 'Práctica', icon: '💻' },
    { id: 'solucion', label: '4. Solución', shortLabel: 'Solución', icon: '💡' }
  ];

  return (
    <main id="workspace-content" className="workspace">
      <style>{`
        /* Workspace Content */
        .workspace {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          justify-content: center;
        }

        .content-card-box {
          width: 100%;
          max-width: 1040px;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Accessible Tabs */
        .cycle-tabs-bar {
          display: flex;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          padding: 0.35rem;
          gap: 0.35rem;
        }

        .cycle-tab-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: var(--transition-smooth);
          min-height: 44px;
        }
        .cycle-tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-accent);
        }
        .cycle-tab-btn.active {
          background: var(--primary);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 15px var(--primary-glow);
        }

        @media (max-width: 900px) {
          .workspace {
            padding: 1.25rem;
          }
          .cycle-tabs-bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.4rem;
          }
        }

        @media (max-width: 520px) {
          .cycle-tab-btn {
            padding: 0.7rem 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
      <div className="content-card-box">
        
        {/* Accessible 4-Step Cycle Tabs */}
        <div 
          role="tablist" 
          aria-label="Ciclo de aprendizaje de 4 pasos" 
          className="cycle-tabs-bar"
        >
          {tabs.map((tab) => {
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`lesson-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`lesson-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(tab.id as any)}
                className={`cycle-tab-btn ${isActive ? 'active' : ''}`}
              >
                <span aria-hidden="true">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: VIDEO CONCEPTUAL */}
        {activeMode === 'video' && (
          <div 
            role="tabpanel"
            id="lesson-panel-video"
            aria-labelledby="lesson-tab-video"
            tabIndex={0}
            className="animate-fade-in" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Custom Accessible Video Mockup */}
            <div 
              className="glass-panel" 
              style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                background: '#090a0f', 
                borderRadius: '16px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                position: 'relative', 
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' 
              }}
            >
              {/* Video Top Bar */}
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.8rem', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span aria-hidden="true">{currentExplanationInfo.icon}</span>
                  <span>{currentExplanationInfo.tag}</span>
                </div>
                <span style={{ background: 'rgba(0, 0, 0, 0.65)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  1080p Full HD
                </span>
              </div>

              {/* Central Play/Pause Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    setLiveAnnouncement(isPlaying ? 'Video pausado' : 'Video en reproducción');
                  }}
                  aria-label={isPlaying ? 'Pausar video' : 'Reproducir video de la lección'}
                  style={{
                    width: '76px',
                    height: '76px',
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px var(--primary-glow)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {isPlaying ? (
                    <div style={{ display: 'flex', gap: '6px' }} aria-hidden="true">
                      <div style={{ width: '6px', height: '22px', background: 'white', borderRadius: '2px' }}></div>
                      <div style={{ width: '6px', height: '22px', background: 'white', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div 
                      aria-hidden="true" 
                      style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '4px' }}
                    />
                  )}
                </button>
                <span style={{ color: '#ffffff', fontSize: '0.9rem', marginTop: '1rem', fontWeight: 500, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  {isPlaying ? 'Reproduciendo lección...' : 'Pulsa para reproducir (06:30 min)'}
                </span>
              </div>

              {/* Video Player Controls Bar */}
              <div style={{ padding: '1rem 1.25rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 2 }}>
                {/* Scrub line */}
                <div 
                  role="progressbar" 
                  aria-valuenow={isPlaying ? 45 : 0} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                  aria-label="Progreso del video"
                  style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '99px', position: 'relative', cursor: 'pointer' }}
                >
                  <div style={{ width: isPlaying ? '45%' : '0%', height: '100%', background: 'var(--primary)', borderRadius: '99px', transition: 'width 0.3s' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <span>{isPlaying ? '02:55' : '00:00'} / 06:30</span>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>1.0x</span>
                    <span aria-hidden="true">🔊</span>
                    <span aria-hidden="true">⛶</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clarification prompt & Quick switch */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  ¿No terminas de entender esta lección con este video?
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Nuestra metodología se adapta a ti
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Cada persona procesa el razonamiento abstracto de forma diferente. Si el enfoque actual no hace clic, cambia a otra perspectiva sin coste ni esfuerzo:
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleStyleChange(-1)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', minHeight: '44px' }}
                >
                  🎯 Probar Enfoque Estándar
                </button>
                {lesson.alternativeExplanations?.map((alt, i) => (
                  <button
                    key={i}
                    onClick={() => handleStyleChange(i)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', minHeight: '44px' }}
                  >
                    {alt.type === 'graphic' ? '🧩 Probar Enfoque Visual' : '⚙️ Probar Enfoque Técnico'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APUNTES ESCRITOS */}
        {activeMode === 'apuntes' && (
          <div 
            role="tabpanel"
            id="lesson-panel-apuntes"
            aria-labelledby="lesson-tab-apuntes"
            tabIndex={0}
            className="animate-fade-in glass-panel" 
            style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.25rem' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--primary-glow)', color: 'var(--text-primary)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Adaptado a: {currentExplanationInfo.tag}
                </span>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)' }}>
                  Apuntes estructurados: {lesson.title}
                </h2>
              </div>
            </div>

            {/* Body Content dynamically formatted based on mode */}
            <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              {currentExplanationBlocks?.map((block, idx) => {
                if (block.type === 'text') {
                  return (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: block.html }} style={{ marginBottom: '1rem' }} />
                  );
                }
                
                if (block.type === 'highlight') {
                  const borderColor = block.style === 'primary' ? 'var(--primary)' : block.style === 'secondary' ? 'var(--secondary)' : 'var(--success)';
                  const bgColor = block.style === 'primary' ? 'rgba(99, 102, 241, 0.1)' : block.style === 'secondary' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)';
                  return (
                    <div key={idx} style={{ padding: '1.25rem', background: bgColor, borderLeft: `4px solid ${borderColor}`, borderRadius: '0 8px 8px 0', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                      <strong>{block.icon} {block.title}</strong> <span dangerouslySetInnerHTML={{ __html: block.html }} />
                    </div>
                  );
                }

                if (block.type === 'code') {
                  const highlightCode = (code: string) => {
                    let highlighted = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    // Comments
                    highlighted = highlighted.replace(/(\/\/.*)/g, '<span style="color: #64748b">$1</span>');
                    // Strings
                    highlighted = highlighted.replace(/(".*?")/g, '<span style="color: #f59e0b">$1</span>');
                    // Keywords
                    highlighted = highlighted.replace(/\b(public|class|static|void|int|String|for|if|else|return|new|boolean|double|float|long|short|byte|char)\b/g, '<span style="color: var(--secondary)">$1</span>');
                    // Numbers
                    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: var(--success)">$1</span>');
                    return highlighted;
                  };

                  return (
                    <div key={idx} style={{ marginTop: '1.5rem', marginBottom: '1.5rem', background: '#0a0a0e', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                      <div style={{ padding: '0.65rem 1rem', background: '#13151b', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace' }}>{block.filename || 'Código'}</span>
                        <button
                          onClick={(e) => {
                            navigator.clipboard.writeText(block.code);
                            const btn = e.currentTarget;
                            btn.innerHTML = '✓ Copiado';
                            btn.style.color = 'var(--success)';
                            setTimeout(() => {
                              btn.innerHTML = '📋 Copiar';
                              btn.style.color = '#ffffff';
                            }, 2000);
                          }}
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            borderRadius: '6px',
                            padding: '0.3rem 0.75rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            minHeight: '32px',
                            transition: 'color 0.2s'
                          }}
                          aria-label="Copiar código al portapapeles"
                        >
                          📋 Copiar
                        </button>
                      </div>
                      <pre style={{ margin: 0, padding: '1.25rem', color: '#cbd5e1', overflowX: 'auto', fontFamily: 'Consolas, monospace', fontSize: '0.95rem' }}>
                        <code dangerouslySetInnerHTML={{ __html: highlightCode(block.code) }} />
                      </pre>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PRÁCTICA GUIADA */}
        {activeMode === 'practica' && (
          <div 
            role="tabpanel"
            id="lesson-panel-practica"
            aria-labelledby="lesson-tab-practica"
            tabIndex={0}
            className="animate-fade-in" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Instructions banner */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--success)', fontWeight: 700 }}>
                    Reto guiado interactivo
                  </span>
                  <h2 style={{ fontSize: '1.35rem', margin: '0.25rem 0 0.5rem 0', color: 'var(--text-primary)' }}>
                    Declarar tu primera variable
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                    {selectedExplanation === -1
                      ? 'Declara una variable de tipo entero llamada "puntuacion" con el valor 100 dentro del método main.'
                      : currentExplanationInfo.tag === 'Enfoque Gráfico'
                      ? 'Crea una caja de memoria etiquetada "puntuacion" y guarda en su interior el número 100.'
                      : 'Asigna 100 a un identificador "puntuacion" con tipo primitivo int de 32 bits.'}
                  </p>
                </div>

                <div style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid var(--primary)', borderRadius: '99px', padding: '0.35rem 0.85rem', fontSize: '0.8rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span aria-hidden="true">{currentExplanationInfo.icon}</span>
                  <span>{currentExplanationInfo.tag}</span>
                </div>
              </div>
            </div>

            {/* Accessible Interactive Code Editor */}
            <div style={{ background: '#0a0a0e', border: '1px solid var(--glass-border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ padding: '0.75rem 1.25rem', background: '#13151b', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                  <span style={{ marginLeft: '0.5rem', color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace' }}>Main.java</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Java 21 LTS</span>
              </div>

              <div style={{ padding: '1.5rem', fontFamily: 'Consolas, monospace', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.7, overflowX: 'auto' }}>
                <span style={{ color: '#64748b' }}>1</span> &nbsp;<span style={{ color: 'var(--secondary)' }}>public class</span> Main &#123;<br />
                <span style={{ color: '#64748b' }}>2</span> &nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--secondary)' }}>public static void</span> main(String[] args) &#123;<br />
                <span style={{ color: '#64748b' }}>3</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#64748b' }}>// Escribe tu respuesta aquí:</span><br />
                <span style={{ color: '#64748b' }}>4</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--secondary)' }}>int</span> puntuacion = <span style={{ color: 'var(--success)' }}>100</span>;<br />
                <span style={{ color: '#64748b' }}>5</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(puntuacion);<br />
                <span style={{ color: '#64748b' }}>6</span> &nbsp;&nbsp;&nbsp;&#125;<br />
                <span style={{ color: '#64748b' }}>7</span> &#125;
              </div>

              {/* Console Output Area if executed */}
              {terminalOutput && (
                <div style={{ padding: '1rem 1.25rem', background: '#050508', borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--success)', whiteSpace: 'pre-wrap' }} role="status">
                  {terminalOutput}
                </div>
              )}

              {/* Bottom Action Bar */}
              <div style={{ padding: '1rem 1.25rem', background: '#111318', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  💡 Pista: Recuerda terminar cada instrucción con un punto y coma (;).
                </span>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.75rem', fontSize: '0.9rem', minHeight: '44px' }}
                  aria-label="Ejecutar y comprobar código"
                >
                  {isRunningCode ? 'Compilando...' : '▶ Ejecutar código'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOLUCIÓN EXPLICADA */}
        {activeMode === 'solucion' && (
          <div 
            role="tabpanel"
            id="lesson-panel-solucion"
            aria-labelledby="lesson-tab-solucion"
            tabIndex={0}
            className="animate-fade-in" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div 
              className="glass-panel" 
              style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                background: '#090a0f', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column', 
                gap: '1.25rem', 
                position: 'relative', 
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(16, 185, 129, 0.2)', padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.8rem', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.4)', fontWeight: 600 }}>
                ✓ Solución oficial guiada ({currentExplanationInfo.tag})
              </div>

              <button
                aria-label="Ver video con la solución explicada paso a paso"
                style={{ 
                  width: '76px', 
                  height: '76px', 
                  background: 'rgba(16,185,129,0.25)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer', 
                  border: '2px solid var(--success)', 
                  boxShadow: '0 0 25px rgba(16,185,129,0.4)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div 
                  aria-hidden="true"
                  style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '4px' }}
                />
              </button>

              <div>
                <h2 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                  Ver razonamiento y corrección en video
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
                  Aprende por qué esta solución es la más limpia y cómo evitar los errores más comunes de principiantes.
                </p>
              </div>
            </div>

            {/* Summary of solution */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Puntos clave para recordar:
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                <li>Las variables en Java requieren especificar su tipo antes del nombre (ej: <code>int</code>).</li>
                <li>El signo igual (<code>=</code>) es el operador de asignación: guarda lo que está a la derecha en la caja de la izquierda.</li>
                <li>Recuerda siempre el punto y coma (<code>;</code>) al finalizar cada sentencia.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
