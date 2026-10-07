'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ONBOARDING_QUESTIONS,
  LEARNING_PROFILES,
  LearningProfile
} from '@/data/onboardingData';
import styles from './onboarding.module.css';

export default function OnboardingPage() {
  const router = useRouter();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultProfile, setResultProfile] = useState<LearningProfile | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  const totalSteps = ONBOARDING_QUESTIONS.length;
  const currentQuestion = ONBOARDING_QUESTIONS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestion.id]: optionId
    };
    setSelectedAnswers(updatedAnswers);

    // Auto-advance with smooth micro-delay for UX
    setTimeout(() => {
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        calculateResults(updatedAnswers);
      }
    }, 280);
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const calculateResults = (answers: Record<number, string>) => {
    setIsCalculating(true);

    const scores = {
      visual: 0,
      tecnico: 0,
      realista: 0
    };

    ONBOARDING_QUESTIONS.forEach(q => {
      const chosenOptionId = answers[q.id];
      const option = q.options.find(opt => opt.id === chosenOptionId);

      if (option && option.profileWeight) {
        scores.visual += option.profileWeight.visual || 0;
        scores.tecnico += option.profileWeight.tecnico || 0;
        scores.realista += option.profileWeight.realista || 0;
      }
    });

    // Determine highest score profile
    let bestProfileKey: 'visual' | 'tecnico' | 'realista' = 'visual';
    let maxScore = -1;

    (Object.keys(scores) as Array<'visual' | 'tecnico' | 'realista'>).forEach(key => {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        bestProfileKey = key;
      }
    });

    const determinedProfile = LEARNING_PROFILES[bestProfileKey];

    setTimeout(async () => {
      setResultProfile(determinedProfile);
      setIsCalculating(false);

      // Save to localStorage so courses immediately prioritize videos in this format
      const profilePayload = {
        profileId: determinedProfile.id,
        profileTitle: determinedProfile.title,
        explanationType: determinedProfile.explanationType,
        savedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('user_learning_profile', JSON.stringify(profilePayload));
      } catch (e) {
        console.error('Error saving profile to localStorage', e);
      }

      // If user is logged in, optionally sync to Supabase auth user metadata
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.auth.updateUser({
            data: {
              learning_profile: profilePayload
            }
          });
        }
      } catch (err) {
        console.error('Error updating user metadata in Supabase', err);
      }
    }, 1200);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentStepIndex(0);
    setResultProfile(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.phoneFrame}>
        {/* Top Header / Progress bar */}
        {!resultProfile && !isCalculating && (
          <div className={styles.header}>
            <div className={styles.topBar}>
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={styles.navBtn}
                aria-label="Pregunta anterior"
              >
                ← Atrás
              </button>

              <span className={styles.stepIndicator}>
                Paso {currentStepIndex + 1} de {totalSteps}
              </span>

              <Link href="/" className={styles.navBtn} aria-label="Saltar o salir">
                Saltar ✕
              </Link>
            </div>

            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Calculating screen */}
        {isCalculating && (
          <div className={styles.loadingState}>
            <div className={styles.spinnerPill} />
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
              Definiendo tu perfil pedagógico...
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px' }}>
              Analizando cómo asimilas el código para seleccionar tu enfoque y plan ideal.
            </p>
          </div>
        )}

        {/* Step Question Screen */}
        {!resultProfile && !isCalculating && currentQuestion && (
          <div className={styles.content} key={currentQuestion.id}>
            <div className={styles.stepTag}>
              <span>🎯</span> {currentQuestion.stepName}
            </div>

            <h1 className={styles.questionTitle}>{currentQuestion.title}</h1>
            <p className={styles.questionSubtitle}>{currentQuestion.subtitle}</p>

            <div className={styles.optionsList}>
              {currentQuestion.options.map(option => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
                  >
                    <div className={styles.optionIconWrap}>
                      {option.icon}
                    </div>

                    <div className={styles.optionText}>
                      <div className={styles.optionTitle}>{option.title}</div>
                      <div className={styles.optionSubtitle}>{option.subtitle}</div>
                    </div>

                    <div className={styles.radioCircle}>
                      {isSelected && <div className={styles.radioDot} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Result Screen */}
        {resultProfile && (
          <div className={styles.resultContainer}>
            <div className={styles.resultBadgeHeader}>
              <div className={styles.resultIconLg}>{resultProfile.icon}</div>
              <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Tu Formato de Aprendizaje
              </span>
              <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0', color: 'var(--text-primary)' }}>
                {resultProfile.title}
              </h1>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0.5rem auto 0', maxWidth: '380px', lineHeight: 1.5 }}>
                {resultProfile.headline}
              </p>
            </div>

            {/* Course Adaptation Card */}
            <div 
              className="glass-panel card flex-col" 
              style={{ 
                padding: '1.75rem 1.5rem', 
                width: '100%', 
                border: '1px solid var(--primary)', 
                position: 'relative' 
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700, width: 'fit-content', marginBottom: '0.75rem' }}>
                <span>🎯</span> Enfoque Activado para tu Visor
              </div>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                {resultProfile.explanationType === 'graphic' && 'Prioridad a Explicaciones Gráficas & Esquemas'}
                {resultProfile.explanationType === 'technical' && 'Prioridad a Enfoque Técnico & Bajo Nivel'}
                {resultProfile.explanationType === 'simplified' && 'Prioridad a Casos Prácticos & Proyectos Reales'}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: '0 0 1rem 0' }}>
                ✨ {resultProfile.priorityAdvice}
              </p>

              <div style={{ background: 'var(--bg-accent)', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span>💡</span>
                <span>En cualquier vídeo podrás alternar al instante entre las 3 perspectivas disponibles.</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.actionStack}>
              <Link
                href="/courses/java-zero-to-hero"
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '48px', fontSize: '1rem', fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                🚀 Ir al Curso con mi Formato Activado
              </Link>

              {!user ? (
                <Link
                  href="/register"
                  className="btn btn-secondary"
                  style={{ textAlign: 'center', width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
                >
                  💾 Crear cuenta para guardar mi perfil
                </Link>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--success)' }}>
                  ✓ Perfil guardado y sincronizado con tu cuenta
                </div>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className={styles.navBtn}
                style={{ alignSelf: 'center', fontSize: '0.85rem' }}
              >
                🔄 Repetir test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
