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
        <section className="container flex-col items-center" style={{ paddingTop: '5rem', paddingBottom: '4rem', textAlign: 'center' }} aria-labelledby="hero-title">
          <div style={{ display: 'inline-block', padding: '0.4rem 1.2rem', background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', borderRadius: '99px', color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.85rem' }} className="animate-fade-in">
            ✨ Aprende paso a paso, sin frustraciones ni jerga técnica
          </div>
          
          <h1 id="hero-title" className="animate-fade-in delay-1" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.15' }}>
            Aprende a programar desde <span className="text-gradient">CERO</span>, de la forma en que tu mente aprende mejor.
          </h1>
          
          <p className="animate-fade-in delay-2" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '1.5rem auto', lineHeight: 1.7 }}>
            Lecciones cortas, apuntes claros y múltiples perspectivas explicativas (visual, lógica o técnica). Si no entiendes un concepto a la primera, te lo explicamos de otra forma.
          </p>
          
          <div className="flex justify-center gap-2 animate-fade-in delay-3" style={{ marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{ minHeight: '48px', padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              🚀 Comenzar ahora (Sin conocimientos previos)
            </Link>
            <a href="#precios" className="btn btn-secondary" style={{ minHeight: '48px', padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
              🏷️ Ver Planes y Precios
            </a>
          </div>

          <div className="flex justify-center gap-4 animate-fade-in delay-3" style={{ marginTop: '2rem', fontSize: '0.95rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
            <span>✅ Sin matemáticas complejas</span>
            <span>✅ Desde los 12 a los 99 años</span>
            <span>✅ A tu propio ritmo</span>
          </div>
        </section>

        {/* Highlights Section */}
        <section id="metodologia" className="container" style={{ paddingBottom: '5rem', paddingTop: '1rem' }} aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="sr-only">Nuestra metodología didáctica</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            <div className="glass-panel card flex-col" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--primary)' }} aria-hidden="true">🧠</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Una idea, varias formas</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Si una explicación no encaja con tu forma de pensar, cambia el enfoque pedagógico con un solo clic: visual, lógico o técnico.
              </p>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--secondary)' }} aria-hidden="true">⏱️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Micro-videos de 10 min</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Cero relleno ni paja. Explicamos un solo concepto por lección para evitar la saturación y la fatiga mental.
              </p>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--success)' }} aria-hidden="true">🛠️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Aprende programando</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                No basta con mirar pasivamente. Cada lección incluye retos guiados en el navegador para asimilar la teoría de inmediato.
              </p>
            </div>

          </div>
        </section>

        {/* Learning Cycle Section */}
        <section className="container" style={{ paddingBottom: '6rem' }} aria-labelledby="cycle-title">
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
        <section className="container" style={{ paddingBottom: '6rem' }} aria-labelledby="audience-title">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              UNA COMUNIDAD PARA TODOS
            </span>
            <h2 id="audience-title" style={{ marginTop: '0.5rem' }}>La programación no es para unos pocos elegidos</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '720px', margin: '0.75rem auto 0 auto' }}>
              Nuestra metodología está diseñada desde cero para que cualquier persona, sin importar su edad ni su punto de partida, asimile la lógica del código de manera natural.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            
            <div className="glass-panel card flex-col" style={{ padding: '2rem', borderTop: '4px solid #3b82f6' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🎓</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Estudiantes (FP / Uni)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                ¿El profesor va muy rápido y asume que ya sabes programar? Aquí te enseñamos lo que te exigen aprobar, explicado con paciencia y paso a paso.
              </p>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2rem', borderTop: '4px solid #10b981' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🚀</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Autodidactas</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Olvídate de tutoriales dispersos que te frustran. Este es el camino estructurado y directo para dominar la lógica detrás del código.
              </p>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2rem', borderTop: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🎮</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Niños y Adolescentes</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Construye las bases de su futuro con explicaciones visuales y entretenidas que fomentan el pensamiento lógico y la resolución de problemas.
              </p>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2rem', borderTop: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">🧠</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Personas Mayores</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Aprender a programar mantiene tu mente activa y ágil. Nuestro ritmo pausado y sin estrés es ideal para adquirir una nueva habilidad a cualquier edad.
              </p>
            </div>

          </div>
        </section>

        {/* Pricing Section: 3 Identical Tiers */}
        <section id="precios" className="container" style={{ paddingBottom: '6rem' }} aria-labelledby="pricing-title">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 id="pricing-title">Invierte en tu mente</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              Sin matrículas ocultas ni ataduras. Cancela cuando quieras en 1 clic.
            </p>
          </div>

          <div className="pricing-grid">
            
            {/* TIER 1: Autoestudio */}
            <div className="glass-panel card flex-col" style={{ padding: '2.5rem 1.75rem', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Tier 1: Autoestudio</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: 'var(--text-primary)' }}>
                29€<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mes</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '2', flexGrow: 1 }}>
                <li>✓ Acceso total al catálogo grabado</li>
                <li>✓ Explicaciones adaptadas (3 perspectivas)</li>
                <li>✓ Canal de dudas asíncrono con soporte</li>
                <li>✓ Prácticas interactivas y retos resueltos</li>
                <li>✓ 0 horas en directo (a tu propio ritmo)</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', marginTop: 'auto' }}>
                Elegir Autoestudio
              </Link>
            </div>

            {/* TIER 2: Bootcamp Grupal */}
            <div className="glass-panel card flex-col" style={{ padding: '2.5rem 1.75rem', width: '100%', border: '1px solid var(--primary)', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1.25rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                RECOMENDADO
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Tier 2: Bootcamp Grupal</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: 'var(--text-primary)' }}>
                59€<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mes</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '2', flexGrow: 1 }}>
                <li>✓ Todo lo incluido en Autoestudio</li>
                <li>✓ 2 tutorías grupales/mes (60 min, grupos de 5)</li>
                <li>✓ 1 webinar temático mensual en directo</li>
                <li>✓ Horarios fijos semanales (sesiones grabadas)</li>
                <li>✓ Feedback directo y resolución de dudas</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{ width: '100%', minHeight: '44px', marginTop: 'auto' }}>
                Elegir Plan Grupal
              </Link>
            </div>

            {/* TIER 3: Mentoría 1 a 1 */}
            <div className="glass-panel card flex-col" style={{ padding: '2.5rem 1.75rem', width: '100%', border: '1px solid var(--glass-border)', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '0.25rem 1.25rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                SOLO 6 PLAZAS/MES
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Tier 3: Mentoría 1 a 1</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: 'var(--text-primary)' }}>
                149€<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mes</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '2', flexGrow: 1 }}>
                <li>✓ Todo lo incluido en el Plan Grupal</li>
                <li>✓ 2 sesiones privadas 1 a 1 de 45 min/mes</li>
                <li>✓ Revisión y auditoría de tu código en vivo</li>
                <li>✓ Resolución de bloqueos por videollamada</li>
                <li>✓ Seguimiento y asesoramiento de carrera</li>
              </ul>
              <Link href="/contacto" className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', marginTop: 'auto' }}>
                Solicitar Plaza 1 a 1
              </Link>
            </div>

          </div>
        </section>

        {/* Punto 3: Interactive FAQ Section with SEO JSON-LD */}
        <FaqSection />

        {/* Punto 5: Elegant Final Call to Action Section */}
        <section className="container" style={{ paddingBottom: '5rem', paddingTop: '1rem' }} aria-labelledby="cta-final-title">
          <div 
            className="glass-panel" 
            style={{ 
              padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)', 
              borderRadius: '24px', 
              textAlign: 'center',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              boxShadow: 'var(--glass-shadow)',
              position: 'relative'
            }}
          >
            <h2 id="cta-final-title" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)', maxWidth: '750px', margin: '0 auto 1rem auto', lineHeight: 1.2 }}>
              Aprende a programar con una metodología pensada para <span className="text-gradient">entender</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', maxWidth: '620px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
              Comienza hoy mismo con explicaciones claras, apuntes estructurados y práctica guiada adaptada a tu ritmo.
            </p>

            <div className="flex justify-center gap-2" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
              <Link 
                href={`/courses/${course.id}`} 
                className="btn btn-primary" 
                style={{ minHeight: '48px', padding: '0.8rem 2.2rem', fontSize: '1rem', fontWeight: 600 }}
              >
                Entrar al Curso
              </Link>

              <Link 
                href="/contacto" 
                className="btn btn-secondary" 
                style={{ minHeight: '48px', padding: '0.8rem 1.8rem', fontSize: '1rem', fontWeight: 500 }}
              >
                Contactar con el Profesor
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
