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

      {/* Header & Navigation */}

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
          
          <div className="flex justify-center gap-3 animate-fade-in delay-3" style={{ marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{ minHeight: '48px', padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              🚀 Comenzar ahora (Sin conocimientos previos)
            </Link>
            <Link href="/onboarding" className="btn btn-secondary" style={{ minHeight: '48px', padding: '0.9rem 1.8rem', fontSize: '1.05rem', border: '1px solid var(--primary)' }}>
              🎯 Test de Estilo: Descubre tu Perfil (1 min)
            </Link>
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

        {/* Pricing Section */}
        <section id="precios" className="container" style={{ paddingBottom: '6rem' }} aria-labelledby="pricing-title">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 id="pricing-title">Invierte en tu mente</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>Sin matrículas ocultas ni ataduras. Cancela cuando quieras en 1 clic.</p>
          </div>

          <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
            <div className="glass-panel card flex-col" style={{ padding: '2.5rem', width: '100%', maxWidth: '360px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Membresía Mensual</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: 'var(--text-primary)' }}>
                19€<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mes</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>✓ Acceso total al curso de Java</li>
                <li>✓ Explicaciones adaptadas (3 perspectivas)</li>
                <li>✓ Prácticas interactivas y soluciones</li>
                <li>✓ Cancela en cualquier momento</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-secondary" style={{ width: '100%', minHeight: '44px' }}>
                Elegir Plan Mensual
              </Link>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2.5rem', width: '100%', maxWidth: '360px', border: '1px solid var(--primary)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1.25rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                RECOMENDADO
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Membresía Anual</h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: 'var(--text-primary)' }}>
                149€<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/año</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>✓ <strong style={{ color: 'var(--text-primary)' }}>Ahorras 2 meses</strong> al año</li>
                <li>✓ Acceso total a todos los cursos</li>
                <li>✓ Explicaciones alternativas sin límite</li>
                <li>✓ Soporte para dudas con el profesor</li>
              </ul>
              <Link href={`/courses/${course.id}`} className="btn btn-primary" style={{ width: '100%', minHeight: '44px' }}>
                Elegir Plan Anual
              </Link>
            </div>

            <div className="glass-panel card flex-col" style={{ padding: '2.5rem', width: '100%', maxWidth: '360px', border: '1px solid #f59e0b', position: 'relative', background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, rgba(26, 29, 36, 0.8) 100%)' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#000', padding: '0.25rem 1.25rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                🔥 SESIÓN EN DIRECTO
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#f59e0b' }}>Mentoría Live Semanal</h3>
              <div style={{ fontSize: '2rem', fontWeight: 800, margin: '1.25rem 0', color: 'var(--text-primary)' }}>
                1h / Semana<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400, display: 'block' }}>En vivo con el profesor</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
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
