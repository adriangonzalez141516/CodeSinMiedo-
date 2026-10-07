import { getCourseById } from '@/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <>
      <a href="#course-content" className="skip-link">
        Saltar al contenido del curso
      </a>

      {/* Navigation */}
      <header role="banner">
        <nav className="navbar" aria-label="Navegación principal">
          <div className="container">
            <Link href="/" className="nav-brand" aria-label="DevProfesor - Inicio">
              <span className="text-gradient">Dev</span>Profesor
            </Link>
            <div className="flex gap-2">
              <Link href="/" className="btn btn-secondary" style={{ minHeight: '44px' }}>
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main id="course-content">
        <section className="container" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
          {/* Course Banner */}
          <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {course.level}
            </span>
            <h1 style={{ margin: '0.5rem 0 1rem 0', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              {course.title}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: 1.7, margin: 0 }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {course.audience.map((item, idx) => (
                <span key={idx} style={{ background: 'var(--bg-accent)', border: '1px solid var(--glass-border)', padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  👤 Para: {item}
                </span>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Temario y Lecciones</h2>

          <div className="flex-col gap-4">
            {course.modules.map((module) => (
              <section key={module.id} className="glass-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }} aria-labelledby={`module-title-${module.id}`}>
                <h3 id={`module-title-${module.id}`} style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {module.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  {module.description}
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }} role="list">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link 
                        href={`/courses/${course.id}/lessons/${module.id}/${lesson.id}`}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem 1.25rem', 
                          background: 'var(--bg-secondary)', 
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          minHeight: '48px',
                          gap: '1rem',
                          textDecoration: 'none'
                        }}
                        className="card"
                        aria-label={`Lección: ${lesson.title}`}
                      >
                        <div>
                          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                            {lesson.title}
                          </h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'inline-block' }}>
                            {lesson.type === 'video' ? '🎬 Micro-video (Ciclo 4-en-1)' : '📝 Lectura guiada'} 
                            {lesson.alternativeExplanations && ` • ${lesson.alternativeExplanations.length + 1} enfoques adaptados`}
                            {lesson.practices && ` • ${lesson.practices.length} retos prácticos`}
                          </span>
                        </div>
                        <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                          Entrar →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
