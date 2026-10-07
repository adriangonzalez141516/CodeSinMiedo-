'use client';

import { useState } from 'react';

const TOPICS = [
  { id: 'curso', label: 'Duda sobre el curso de Java' },
  { id: 'orientacion', label: 'Orientación académica (FP / Uni)' },
  { id: 'tecnico', label: 'Soporte técnico o facturación' },
  { id: 'otro', label: 'Otra consulta' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: 'curso',
    mensaje: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTopicClick = (topicId: string) => {
    setFormData(prev => ({
      ...prev,
      motivo: topicId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setErrorMessage('Por favor, completa todos los campos requeridos.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      email: '',
      motivo: 'curso',
      mensaje: ''
    });
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="glass-panel contact-success-card">
        <div className="contact-success-icon" aria-hidden="true">
          ✓
        </div>
        <h3 className="contact-success-title">
          Mensaje enviado con éxito
        </h3>
        <p className="contact-success-desc">
          Gracias por escribirnos, <strong>{formData.nombre}</strong>. Hemos recibido tu consulta y te responderemos a <strong>{formData.email}</strong> en menos de 24 horas laborables.
        </p>
        <button 
          type="button" 
          onClick={handleReset} 
          className="btn btn-secondary"
        >
          Enviar otro mensaje
        </button>

        <style jsx>{`
          .contact-success-card {
            padding: 3rem 2rem;
            text-align: center;
            border-radius: 20px;
            border: 1px solid var(--success);
            background: var(--glass-bg);
          }
          .contact-success-icon {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.15);
            color: var(--success);
            font-size: 1.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem auto;
            font-weight: 700;
          }
          .contact-success-title {
            font-size: 1.4rem;
            color: var(--text-primary);
            margin-bottom: 0.75rem;
          }
          .contact-success-desc {
            color: var(--text-secondary);
            font-size: 0.98rem;
            line-height: 1.6;
            max-width: 440px;
            margin: 0 auto 1.75rem auto;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-panel contact-form"
      aria-label="Formulario de contacto"
    >
      {status === 'error' && errorMessage && (
        <div role="alert" className="contact-alert-error">
          {errorMessage}
        </div>
      )}

      {/* Selector de Motivo */}
      <div>
        <label className="form-label">
          Motivo de la consulta
        </label>
        <div className="topics-grid">
          {TOPICS.map(topic => {
            const isSelected = formData.motivo === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicClick(topic.id)}
                className={`topic-btn ${isSelected ? 'selected' : ''}`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nombre y Email */}
      <div className="inputs-row">
        <div className="input-group">
          <label htmlFor="contact-nombre" className="form-label">
            Nombre
          </label>
          <input
            id="contact-nombre"
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="contact-email" className="form-label">
            Correo electrónico
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div className="input-group">
        <label htmlFor="contact-mensaje" className="form-label">
          Mensaje o consulta
        </label>
        <textarea
          id="contact-mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Describe tu consulta, nivel actual o dudas sobre el curso..."
          value={formData.mensaje}
          onChange={handleChange}
          className="form-textarea"
        />
        <div className="textarea-footer">
          <span>Responderemos de forma personalizada y sin respuestas automáticas.</span>
        </div>
      </div>

      {/* Botón de envío */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary submit-btn"
        >
          {status === 'loading' ? 'Enviando consulta...' : 'Enviar consulta'}
        </button>
      </div>

      <style jsx>{`
        .contact-form {
          padding: clamp(1.5rem, 4vw, 2.5rem);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
        }

        .contact-alert-error {
          padding: 0.85rem 1rem;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          color: #ef4444;
          font-size: 0.9rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.5rem;
        }

        .topic-btn {
          padding: 0.65rem 0.9rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--bg-accent);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          text-align: left;
          transition: var(--transition-smooth);
        }

        .topic-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary);
        }

        .topic-btn.selected {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.12);
          color: var(--primary);
          font-weight: 600;
        }

        .inputs-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-smooth);
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .form-textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: var(--transition-smooth);
        }

        .textarea-footer {
          margin-top: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }

        .submit-btn {
          min-height: 46px;
          padding: 0.8rem 2rem;
          font-size: 0.98rem;
          width: 100%;
        }

        @media (min-width: 600px) {
          .submit-btn {
            width: auto;
          }
        }
      `}</style>
    </form>
  );
}
