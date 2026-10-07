'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ONBOARDING_QUESTIONS,
  LEARNING_PROFILES,
  LEARNING_PLANS,
  LearningProfile,
  LearningPlan
} from '@/data/onboardingData';
import styles from './onboarding.module.css';

export default function OnboardingPage() {
  const router = useRouter();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultProfile, setResultProfile] = useState<LearningProfile | null>(null);
  const [recommendedPlan, setRecommendedPlan] = useState<LearningPlan | null>(null);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'autoestudio' | 'grupal' | 'mentoria'>('grupal');
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

    let chosenPlanKey: 'autoestudio' | 'grupal' | 'mentoria' = 'grupal';

    ONBOARDING_QUESTIONS.forEach(q => {
      const chosenOptionId = answers[q.id];
      const option = q.options.find(opt => opt.id === chosenOptionId);

      if (option) {
        if (option.profileWeight) {
          scores.visual += option.profileWeight.visual || 0;
          scores.tecnico += option.profileWeight.tecnico || 0;
          scores.realista += option.profileWeight.realista || 0;
        }

        if (option.planPreference) {
          chosenPlanKey = option.planPreference;
        }
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
    const determinedPlan = LEARNING_PLANS[chosenPlanKey] || LEARNING_PLANS['grupal'];

    setTimeout(async () => {
      setResultProfile(determinedProfile);
      setRecommendedPlan(determinedPlan);
      setSelectedPlanTab(chosenPlanKey);
      setIsCalculating(false);

      // Save to localStorage so courses can immediately sort/prioritize videos
      const profilePayload = {
        profileId: determinedProfile.id,
        profileTitle: determinedProfile.title,
        explanationType: determinedProfile.explanationType,
        planPreference: determinedPlan.id,
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
    setRecommendedPlan(null);
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
        {resultProfile && recommendedPlan && (
          <div className={styles.resultContainer}>
            <div className={styles.resultBadgeHeader}>
              <div className={styles.resultIconLg}>{resultProfile.icon}</div>
              <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Tu Perfil Asignado
              </span>
              <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0', color: 'var(--text-primary)' }}>
                {resultProfile.title}
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.4rem 0 0' }}>
                ✨ {resultProfile.priorityAdvice}
              </p>
            </div>

            {/* Plan Recommendation Section (matching exact website pricing card format) */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Plan Seleccionado
                </span>

                {/* 3 Tiers Toggle */}
                <div style={{ display: 'flex', background: 'var(--bg-accent)', padding: '3px', borderRadius: '99px', fontSize: '0.74rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab('autoestudio')}
                    style={{
                      border: 'none',
                      background: selectedPlanTab === 'autoestudio' ? 'var(--primary)' : 'transparent',
                      color: selectedPlanTab === 'autoestudio' ? '#fff' : 'var(--text-secondary)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    Autoestudio
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab('grupal')}
                    style={{
                      border: 'none',
                      background: selectedPlanTab === 'grupal' ? 'var(--primary)' : 'transparent',
                      color: selectedPlanTab === 'grupal' ? '#fff' : 'var(--text-secondary)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    Grupal
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab('mentoria')}
                    style={{
                      border: 'none',
                      background: selectedPlanTab === 'mentoria' ? 'var(--primary)' : 'transparent',
                      color: selectedPlanTab === 'mentoria' ? '#fff' : 'var(--text-secondary)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    1 a 1
                  </button>
                </div>
              </div>

              {/* Exact format of website pricing card */}
              {(() => {
                const activePlan = LEARNING_PLANS[selectedPlanTab];
                const isRecommended = recommendedPlan.id === activePlan.id;
                const isGrupal = activePlan.id === 'grupal';

                return (
                  <div 
                    className="glass-panel card flex-col" 
                    style={{ 
                      padding: '2rem 1.5rem', 
                      width: '100%', 
                      border: isGrupal ? '1px solid var(--primary)' : '1px solid var(--glass-border)', 
                      position: 'relative' 
                    }}
                  >
                    {isRecommended && (
                      <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.2rem 1.1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                        RECOMENDADO
                      </div>
                    )}

                    <h3 style={{ fontSize: '1.25rem', color: isGrupal ? 'var(--primary)' : 'var(--text-secondary)', margin: 0 }}>
                      {activePlan.name}
                    </h3>

                    <div style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0.75rem 0', color: 'var(--text-primary)' }}>
                      {activePlan.priceNote.replace(' €/mes', '€').replace(' €', '€')}
                      <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mes</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', lineHeight: '2', fontSize: '0.9rem' }}>
                      {activePlan.features.map((feat, idx) => (
                        <li key={idx}>✓ {feat}</li>
                      ))}
                    </ul>

                    <Link
                      href="/courses/java-zero-to-hero"
                      className={`btn ${isGrupal ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%', minHeight: '44px', textAlign: 'center' }}
                    >
                      Empezar con {activePlan.name}
                    </Link>
                  </div>
                );
              })()}
            </div>

            {/* Action buttons */}
            <div className={styles.actionStack}>
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
                  ✓ Perfil sincronizado con tu cuenta
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
