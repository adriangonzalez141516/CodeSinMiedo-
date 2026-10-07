import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { getCourses } from '@/api';
import styles from './contacto.module.css';

export const metadata: Metadata = {
  title: 'Contacto y Orientación Pedagógica | CodeSinMiedo',
  description: '¿Tienes dudas sobre los cursos, necesitas orientación o quieres consultar la disponibilidad de mentoría? Escríbenos y te responderemos en menos de 24h.',
  openGraph: {
    title: 'Contacto y Orientación Docente | CodeSinMiedo',
    description: 'Orientación honesta para aprender a programar sin frustraciones. Habla directamente con el profesor.',
  }
};

export default async function ContactoPage() {
  const courses = await getCourses();
  const course = courses[0];

  return (
    <main id="main-content" className={styles.contactMain}>
      <div className="container">

        {/* Header */}
        <div className={styles.contactHero}>
          <h1 className={styles.contactTitle}>
            Contacto y <span className="text-gradient">Orientación Directa</span>
          </h1>

          <p className={styles.contactSubtitle}>
            Si tienes dudas sobre qué nivel elegir, necesitas orientación para tu temario de FP o universidad, o quieres consultar la disponibilidad para las tutorías o mentoría 1 a 1, escríbenos directamente.
          </p>
        </div>

        {/* Grid Layout: Form + Info Panel */}
        <div className={styles.contactGrid}>
          
          {/* Form Column */}
          <div className={styles.contactFormWrapper}>
            <ContactForm />
          </div>

          {/* Side Information Column */}
          <div className={styles.contactInfoCol}>
            
            {/* Direct channels card */}
            <div className={`${styles.contactCard} glass-panel`}>
              <h2 className={styles.cardHeading}>
                Atención directa
              </h2>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Correo electrónico</span>
                  <a href="mailto:profesor@devprofesor.com" className={styles.infoValueLink}>
                    profesor@devprofesor.com
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Tiempo de respuesta</span>
                  <span className={styles.infoValue}>Menos de 24 horas laborables</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Orientación personalizada</span>
                  <span className={styles.infoValue}>Revisión de planes formativos y dudas de temario</span>
                </div>
              </div>
            </div>

            {/* Pedagogy commitment card */}
            <div className={`${styles.contactCard} ${styles.commitmentCard} glass-panel`}>
              <h3 className={styles.commitmentTitle}>
                Compromiso de honestidad
              </h3>
              <p className={styles.commitmentText}>
                Si tras revisar tu caso consideramos que otra ruta de aprendizaje o tecnología se ajusta mejor a tus metas, te lo indicaremos con total franqueza. Nuestro objetivo prioritario es que adquieras bases de programación sólidas y duraderas.
              </p>
            </div>

            {/* Quick trial link */}
            <div className={`${styles.contactCard} glass-panel`}>
              <h3 className={styles.cardSubheading}>
                ¿Quieres probar una lección antes?
              </h3>
              <p className={styles.cardText}>
                Puedes acceder a la primera lección guiada de Java sin registro previo para conocer el formato interactivo.
              </p>
              <Link 
                href={`/courses/${course?.id || 'java-zero-to-hero'}/lessons/mod-1/les-1`} 
                className="btn btn-primary" 
                style={{ width: '100%', minHeight: '44px', fontSize: '0.92rem' }}
              >
                Ver Lección de Prueba
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
