import { getCourses } from '@/api';
import Link from 'next/link';
import CycleOptions from '@/components/CycleOptions';
import FaqSection from '@/components/FaqSection';

export default async function Home() {
  const courses = await getCourses();
  const course = courses[0];

  return (
    <>
      {/* Skip to main content link for keyboard and screen reader accessibility */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <main id="main-content">
        {/* Hero Section */}
        <section className="container flex-col items-center hero-container" aria-labelledby="hero-title">
          <div className="hero-pill animate-fade-in">
            ✨ Aprende paso a paso, sin frustraciones ni jerga técnica
          </div>
          
          <h1 id="hero-title" className="hero-heading animate-fade-in delay-1">
            Aprende a programar desde <span className="text-gradient">CERO</span>, de la forma en que tu mente aprende mejor.
          </h1>
          
          <p className="hero-description animate-fade-in delay-2">
            Lecciones cortas, apuntes claros y múltiples perspectivas explicativas (visual, lógica o técnica). Si no entiendes un concepto a la primera, te lo explicamos de otra forma.
          </p>
          
          <div className="hero-cta-wrapper animate-fade-in delay-3">
            <Link href={`/courses/${course.id}`} className="btn btn-primary hero-btn">
              🚀 Comenzar ahora (Sin conocimientos previos)
            </Link>
            <Link href="/onboarding" className="btn btn-secondary hero-btn hero-btn-test">
              🎯 Test de Estilo: Descubre tu Perfil (1 min)
            </Link>
          </div>

          <div className="hero-trust-badges animate-fade-in delay-3">
            <span>✅ Sin matemáticas complejas</span>
            <span>✅ Desde los 12 a los 99 años</span>
            <span>✅ A tu propio ritmo</span>
          </div>
        </section>

        {/* Highlights Section */}
        <section id="metodologia" className="container section-spacing" aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="sr-only">Nuestra metodología didáctica</h2>
          <div className="feature-grid">
            
            <div className="glass-panel card feature-card flex-col">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--primary)' }} aria-hidden="true">🧠</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Una idea, varias formas</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Si una explicación no encaja con tu forma de pensar, cambia el enfoque pedagógico con un solo clic: visual, lógico o técnico.
              </p>
            </div>

            <div className="glass-panel card feature-card flex-col">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--secondary)' }} aria-hidden="true">⏱️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Micro-videos de 10 min</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Cero relleno ni paja. Explicamos un solo concepto por lección para evitar la saturación y la fatiga mental.
              </p>
            </div>

            <div className="glass-panel card feature-card flex-col">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--success)' }} aria-hidden="true">🛠️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Aprende programando</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                No basta con mirar pasivamente. Cada lección incluye retos guiados en el navegador para asimilar la teoría de inmediato.
              </p>
            </div>

          </div>
        </section>

        {/* Learning Cycle Section */}
        <section className="container section-spacing" aria-labelledby="cycle-title">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              EL CICLO DE APRENDIZAJE
            </span>
            <h2 id="cycle-title" style={{ marginTop: '0.5rem' }}>El Ciclo 4-en-1 de cada lección</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
              Nunca te dejamos solo frente a una pantalla en blanco. Cada concepto sigue este orden probado paso a paso.
            </p>
          </div>

          <CycleOptions />
        </section>

        {/* Target Audience Section */}
        <section className="container section-spacing" aria-labelledby="audience-title">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              UNA COMUNIDAD PARA TODOS
            </span>
            <h2 id="audience-title" style={{ marginTop: '0.5rem' }}>La programación no es para unos pocos elegidos</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '720px', margin: '0.75rem auto 0 auto' }}>
              Nuestra metodología está diseñada desde cero para que cualquier persona, sin importar su edad ni su punto de partida, asimile la lógica del código de manera natural.
            </p>
          </div>

          <div className="feature-grid">
            
            <div className="glass-panel card feature-card flex-col" style={{ borderTop: '4px solid #3b82f6' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🎓</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Estudiantes (FP / Uni)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                ¿El profesor va muy rápido y asume que ya sabes programar? Aquí te enseñamos lo que te exigen aprobar, explicado con paciencia y paso a paso.
              </p>
            </div>

            <div className="glass-panel card feature-card flex-col" style={{ borderTop: '4px solid #10b981' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🚀</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Autodidactas</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Olvídate de tutoriales dispersos que te frustran. Este es el camino estructurado y directo para dominar la lógica detrás del código.
              </p>
            </div>

            <div className="glass-panel card feature-card flex-col" style={{ borderTop: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🎮</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Niños y Adolescentes</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Construye las bases de su futuro con explicaciones visuales y entretenidas que fomentan el pensamiento lógico y la resolución de problemas.
              </p>
            </div>

            <div className="glass-panel card feature-card flex-col" style={{ borderTop: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🧠</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Personas Mayores</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Aprender a programar mantiene tu mente activa y ágil. Nuestro ritmo pausado y sin estrés es ideal para adquirir una nueva habilidad a cualquier edad.
              </p>
            </div>

          </div>
        </section>

        {/* Pricing Section */}
        <section id="precios" className="container section-spacing" aria-labelledby="pricing-title">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 id="pricing-title">Invierte en tu mente</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>Sin matrículas ocultas ni ataduras. Cancela cuando quieras en 1 clic.</p>
          </div>

          <div className="pricing-grid">
            <div className="glass-panel card pricing-card flex-col">
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Membresía Mensual</h3>
              <div className="pricing-number">
                19€<span className="pricing-period">/mes</span>
              </div>
              <ul className="pricing-list">
                <li>✓ Acceso total al curso de Java</li>
                <li>✓ Explicaciones adaptadas (3 perspectivas)</li>
                <li>✓ Prácticas interactivas y soluciones</li>
                <li>✓ Cancela en cualquier momento</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-secondary" style={{ width: '100%', minHeight: '44px' }}>
                Elegir Plan Mensual
              </Link>
            </div>

            <div className="glass-panel card pricing-card flex-col" style={{ border: '1.5px solid var(--primary)', position: 'relative' }}>
              <div className="pricing-tag-featured">
                RECOMENDADO
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>Membresía Anual</h3>
              <div className="pricing-number">
                149€<span className="pricing-period">/año</span>
              </div>
              <ul className="pricing-list">
                <li>✓ <strong style={{ color: 'var(--text-primary)' }}>Ahorras 2 meses</strong> al año</li>
                <li>✓ Acceso total a todos los cursos</li>
                <li>✓ Explicaciones alternativas sin límite</li>
                <li>✓ Soporte para dudas con el profesor</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{ width: '100%', minHeight: '44px' }}>
                Elegir Plan Anual
              </Link>
            </div>

            <div className="glass-panel card pricing-card flex-col" style={{ border: '1.5px solid #f59e0b', position: 'relative', background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, rgba(26, 29, 36, 0.85) 100%)' }}>
              <div className="pricing-tag-live">
                🔥 SESIÓN EN DIRECTO
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#f59e0b' }}>Mentoría Live Semanal</h3>
              <div className="pricing-number" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.2rem)' }}>
                1h / Semana
                <span className="pricing-period" style={{ display: 'block', fontSize: '0.85rem' }}>En vivo con el profesor</span>
              </div>
              <ul className="pricing-list">
                <li>✓ <strong>1 sesión semanal de 1 hora</strong> en directo</li>
                <li>✓ Resolución de dudas y revisión de código</li>
                <li>✓ Feedback directo y networking con alumnos</li>
                <li>✓ Incluye todo el material y cursos adaptados</li>
              </ul>
              <Link href="/onboarding" className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', border: '1px solid #f59e0b', color: '#f59e0b' }}>
                🎯 Hacer Test y Solicitar Plaza
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section with SEO JSON-LD */}
        <FaqSection />

        {/* Elegant Final Call to Action Section */}
        <section className="container section-spacing" aria-labelledby="cta-final-title">
          <div className="glass-panel cta-banner">
            <h2 id="cta-final-title" className="cta-heading">
              Aprende a programar con una metodología pensada para <span className="text-gradient">entender</span>
            </h2>

            <p className="cta-description">
              Comienza hoy mismo con explicaciones claras, apuntes estructurados y práctica guiada adaptada a tu ritmo.
            </p>

            <div className="cta-btn-group">
              <Link 
                href={`/courses/${course.id}`} 
                className="btn btn-primary cta-btn"
              >
                🚀 Entrar al Curso
              </Link>

              <Link 
                href="/contacto" 
                className="btn btn-secondary cta-btn"
              >
                ✉️ Contactar con el Profesor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .hero-container {
          padding-top: clamp(3rem, 6vw, 5rem);
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
          text-align: center;
        }

        .hero-pill {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          border-radius: 99px;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: clamp(0.78rem, 2.5vw, 0.85rem);
        }

        .hero-heading {
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.15;
          font-size: clamp(1.85rem, 5.5vw, 3.4rem);
        }

        .hero-description {
          font-size: clamp(0.98rem, 3vw, 1.15rem);
          color: var(--text-secondary);
          max-width: 680px;
          margin: 1.25rem auto 1.75rem auto;
          line-height: 1.65;
        }

        .hero-cta-wrapper {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          width: 100%;
        }

        .hero-btn {
          min-height: 48px;
          padding: 0.85rem 1.8rem;
          font-size: 1rem;
          text-align: center;
        }

        .hero-btn-test {
          border: 1px solid var(--primary);
        }

        .hero-trust-badges {
          display: flex;
          justify-content: center;
          gap: 1rem 1.5rem;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .section-spacing {
          padding-top: clamp(2rem, 4vw, 3rem);
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .feature-card {
          padding: clamp(1.35rem, 4vw, 2rem);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
        }

        .pricing-card {
          padding: clamp(1.6rem, 5vw, 2.3rem);
          width: 100%;
        }

        .pricing-tag-featured {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.25rem 1.25rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .pricing-tag-live {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: #f59e0b;
          color: #000;
          padding: 0.25rem 1.25rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .pricing-number {
          font-size: clamp(2.3rem, 6vw, 3rem);
          font-weight: 800;
          margin: 1rem 0;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .pricing-period {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .pricing-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.75rem 0;
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 0.92rem;
        }

        .cta-banner {
          padding: clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem);
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          box-shadow: var(--glass-shadow);
        }

        .cta-heading {
          font-size: clamp(1.75rem, 4.5vw, 2.6rem);
          max-width: 750px;
          margin: 0 auto 1rem auto;
          line-height: 1.2;
        }

        .cta-description {
          color: var(--text-secondary);
          font-size: clamp(0.95rem, 2.8vw, 1.08rem);
          max-width: 620px;
          margin: 0 auto 2rem auto;
          line-height: 1.65;
        }

        .cta-btn-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          min-height: 48px;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .hero-cta-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-btn {
            width: 100%;
          }

          .cta-btn-group {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn {
            width: 100%;
          }

          .hero-trust-badges {
            flex-direction: column;
            gap: 0.4rem;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
