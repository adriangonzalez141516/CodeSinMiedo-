import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  courseId?: string;
}

export default function Footer({ courseId = 'java-zero-to-hero' }: FooterProps) {
  return (
    <footer role="contentinfo" className={styles.siteFooter}>
      <div className="container">
        <div className={styles.footerGrid}>
          
          {/* Brand Column */}
          <div className={styles.footerBrandCol}>
            <Link href="/" className={`nav-brand ${styles.footerLogo}`} aria-label="DevProfesor - Inicio">
              <span className="text-gradient">Dev</span>Profesor
            </Link>
            <p className={styles.footerBrandText}>
              Plataforma pedagógica diseñada para aprender a programar paso a paso, con múltiples perspectivas didácticas y sin barreras innecesarias.
            </p>
          </div>

          {/* Formación */}
          <div className={styles.footerLinksCol}>
            <h3 className={styles.footerColTitle}>Formación</h3>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href={`/courses/${courseId}`} className={styles.footerLink}>
                  Curso de Java
                </Link>
              </li>
              <li>
                <Link href="/#metodologia" className={styles.footerLink}>
                  Metodología 4-en-1
                </Link>
              </li>
              <li>
                <Link href={`/courses/${courseId}/lessons/mod-1/les-1`} className={styles.footerLink}>
                  Clase de Prueba
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte y Contacto */}
          <div className={styles.footerLinksCol}>
            <h3 className={styles.footerColTitle}>Soporte</h3>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href="/contacto" className={`${styles.footerLink} ${styles.footerLinkHighlight}`}>
                  Contacto directo
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={styles.footerLink}>
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <a href="mailto:profesor@devprofesor.com" className={styles.footerLink}>
                  profesor@devprofesor.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.footerLinksCol}>
            <h3 className={styles.footerColTitle}>Legal y Precios</h3>
            <ul className={styles.footerLinksList}>
              <li>
                <Link href="/#precios" className={styles.footerLink}>
                  Planes y Precios
                </Link>
              </li>
              <li>
                <Link href="/contacto?motivo=legal" className={styles.footerLink}>
                  Aviso Legal y Privacidad
                </Link>
              </li>
              <li>
                <span className={styles.footerLinkMuted}>
                  Accesibilidad WCAG 2.1 AA
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottomBar}>
          <div>
            © 2026 DevProfesor. Diseñado para entender, no para memorizar.
          </div>
          <div>
            <span>Formación pedagógica adaptada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
