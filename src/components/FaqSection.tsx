'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Puedo aprender si nunca he visto nada de código ni matemáticas avanzadas?',
    answer: 'Sí, totalmente. La programación básica no requiere cálculo ni matemáticas complejas, sino pensamiento estructurado y sentido común. En DevProfesor explicamos cada concepto con analogías cotidianas y ejemplos tangibles para que interiorices la lógica antes de escribir código.',
  },
  {
    id: 'faq-2',
    question: '¿Por qué empezar con Java en lugar de otro lenguaje?',
    answer: 'Java es el lenguaje de referencia en los ciclos de Formación Profesional (DAW/DAM) y en los primeros cursos universitarios. Al tener tipado estricto, te ayuda a comprender el funcionamiento de la memoria y la estructura limpia del software. Quien domina los fundamentos con Java puede aprender Python, JavaScript o C# con gran facilidad.',
  },
  {
    id: 'faq-3',
    question: '¿En qué se diferencian las perspectivas Visual, Lógica y Técnica?',
    answer: 'Cada estudiante procesa la información de forma distinta. Si una explicación te resulta difícil, en nuestra plataforma puedes alternar en cualquier momento entre el enfoque Visual (diagramas y gráficos paso a paso), el enfoque Lógico (demostraciones deductivas) o el enfoque Técnico (documentación formal y estándares).',
  },
  {
    id: 'faq-4',
    question: '¿Cuánto tiempo necesito dedicarle cada semana?',
    answer: 'El curso está estructurado en micro-lecciones de unos 10 minutos. Con dedicarle de 20 a 30 minutos al día para ver una lección y realizar la práctica guiada, avanzarás de forma constante y sin sobrecarga cognitiva.',
  },
  {
    id: 'faq-5',
    question: '¿Qué ocurre si me quedo atascado en un ejercicio?',
    answer: 'Nunca te dejamos solo ante una pantalla en blanco. Cada ejercicio incluye pistas graduales y la solución comentada paso a paso. Además, los alumnos disponen de soporte directo para consultar dudas con el profesor.',
  },
  {
    id: 'faq-6',
    question: '¿Cómo funcionan las tutorías grupales y qué pasa si falto a una sesión?',
    answer: 'Las tutorías grupales se organizan en grupos reducidos de máximo 5 personas con franjas fijas semanales (ej. martes o jueves a las 19:00h). Si un día no puedes asistir en directo, no pierdes nada: todas las sesiones se graban y quedan disponibles de inmediato en la plataforma para que las repases a tu ritmo.',
  },
  {
    id: 'faq-7',
    question: '¿Cómo funcionan las sesiones 1 a 1 y por qué solo hay 6 plazas al mes?',
    answer: 'Las sesiones de Mentoría privada son 2 videollamadas individuales de 45 minutos al mes, enfocadas al 100% en tu código, tus proyectos y tus bloqueos específicos. Las diseñamos en bloques de 45 minutos para garantizar máxima puntualidad y un margen de 15 minutos para tomar notas y preparar la siguiente. El cupo está estrictamente limitado a 6 alumnos al mes para asegurar una atención exclusiva y de máxima calidad.',
  },
  {
    id: 'faq-8',
    question: '¿Existe algún tipo de compromiso o permanencia?',
    answer: 'Ninguno. Todos los planes (Autoestudio 29€, Grupal 59€ y Mentoría 149€) son suscripciones mensuales sin permanencia. Puedes cancelar o cambiar de nivel en cualquier momento desde tu cuenta.',
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="container faq-section" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-header">
        <h2 id="faq-title">Preguntas Frecuentes</h2>
        <p className="faq-subtitle">
          Respuestas claras sobre la metodología, el ritmo de estudio y el contenido del curso.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-btn-${faq.id}`}
                className="faq-question-btn"
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className="faq-answer"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="faq-footer-note">
        <span>¿Tienes alguna otra duda antes de empezar?</span>{' '}
        <Link href="/contacto" className="faq-contact-link">
          Consúltanos directamente desde la página de contacto →
        </Link>
      </div>

      <style jsx>{`
        .faq-section {
          padding-top: 2rem;
          padding-bottom: 5rem;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-subtitle {
          color: var(--text-secondary);
          margin-top: 0.75rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.05rem;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item {
          border-radius: 16px;
          transition: var(--transition-smooth);
          overflow: hidden;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
        }

        .faq-item.open {
          border-color: var(--primary);
          background: var(--bg-secondary);
        }

        .faq-question-btn {
          width: 100%;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1.05rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
        }

        .faq-question-text {
          flex: 1;
          line-height: 1.45;
        }

        .faq-chevron {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .faq-answer {
          padding: 0 1.5rem 1.35rem 1.5rem;
          color: var(--text-secondary);
          font-size: 0.96rem;
          line-height: 1.65;
          border-top: 1px solid var(--glass-border);
          padding-top: 1rem;
        }

        .faq-footer-note {
          text-align: center;
          margin-top: 2.5rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .faq-contact-link {
          color: var(--primary);
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .faq-contact-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .faq-question-btn {
            padding: 1.1rem 1.2rem;
            font-size: 0.98rem;
          }
          .faq-answer {
            padding: 0 1.2rem 1.2rem 1.2rem;
            padding-top: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
