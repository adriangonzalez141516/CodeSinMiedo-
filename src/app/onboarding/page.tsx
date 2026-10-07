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
  const [selectedPlanTab, setSelectedPlanTab] = useState<'mentorship' | 'self-paced'>('mentorship');
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

    let wantsMentorship = false;

    ONBOARDING_QUESTIONS.forEach(q => {
      const chosenOptionId = answers[q.id];
      const option = q.options.find(opt => opt.id === chosenOptionId);

      if (option) {
        if (option.profileWeight) {
          scores.visual += option.profileWeight.visual || 0;
          scores.tecnico += option.profileWeight.tecnico || 0;
          scores.realista += option.profileWeight.realista || 0;
        }

        if (option.planPreference === 'mentorship') {
          wantsMentorship = true;
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
    const determinedPlan = wantsMentorship ? LEARNING_PLANS['mentorship'] : LEARNING_PLANS['self-paced'];

    setTimeout(async () => {
      setResultProfile(determinedProfile);
      setRecommendedPlan(determinedPlan);
      setSelectedPlanTab(wantsMentorship ? 'mentorship' : 'self-paced');
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
              Analizando tu estilo de aprendizaje...
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px' }}>
              Detectando cómo asimilas mejor la programación y adaptando la ruta de vídeos a tu medida.
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
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Tu Perfil de Aprendizaje
              </span>
              <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0', color: 'var(--text-primary)' }}>
                {resultProfile.title}
              </h1>
            </div>

            {/* Profile Card */}
            <div
              className={styles.resultProfileCard}
              style={{
                borderColor: resultProfile.accentColor,
                '--card-gradient': resultProfile.gradient
              } as React.CSSProperties}
            >
              <span className={styles.profileTag} style={{ color: resultProfile.accentColor }}>
                {resultProfile.tag}
              </span>
              <p className={styles.profileHeadline}>
                {resultProfile.headline}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {resultProfile.description}
              </p>

              <div className={styles.powersList}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Tus Fortalezas Clave:
                </div>
                {resultProfile.superpowers.map((power, idx) => (
                  <div key={idx} className={styles.powerItem}>
                    <span>⚡</span> {power}
                  </div>
                ))}
              </div>
            </div>

            {/* Adaptation Alert */}
            <div className={styles.adaptationBanner}>
              <span className={styles.adaptationBannerIcon}>✨</span>
              <div className={styles.adaptationBannerText}>
                <strong>Adaptación activa:</strong> {resultProfile.priorityAdvice}
              </div>
            </div>

            {/* Plan Recommendation Section */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>
                  Tu Plan Recomendado
                </h3>
                {/* Plan toggle */}
                <div style={{ display: 'flex', background: 'var(--bg-accent)', padding: '3px', borderRadius: '99px', fontSize: '0.78rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab('mentorship')}
                    style={{
                      border: 'none',
                      background: selectedPlanTab === 'mentorship' ? 'var(--primary)' : 'transparent',
                      color: selectedPlanTab === 'mentorship' ? '#fff' : 'var(--text-secondary)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    Mentoría Live
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab('self-paced')}
                    style={{
                      border: 'none',
                      background: selectedPlanTab === 'self-paced' ? 'var(--primary)' : 'transparent',
                      color: selectedPlanTab === 'self-paced' ? '#fff' : 'var(--text-secondary)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '99px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    A tu ritmo
                  </button>
                </div>
              </div>

              {/* Display active plan tab */}
              {(() => {
                const activePlan = LEARNING_PLANS[selectedPlanTab];
                const isRecommended = recommendedPlan.id === activePlan.id;

                return (
                  <div className={`${styles.planBox} ${isRecommended ? styles.planBoxHighlight : ''}`}>
                    {isRecommended && (
                      <div className={styles.planBadge}>
                        Recomendado para ti
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.8rem' }}>{activePlan.icon}</span>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {activePlan.name}
                        </h4>
                        <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                          {activePlan.priceNote}
                        </span>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {activePlan.headline}
                    </p>

                    <ul className={styles.planFeatures}>
                      {activePlan.features.map((feat, idx) => (
                        <li key={idx} className={styles.planFeatureItem}>
                          <span>✓</span>
                          <div>{feat}</div>
                        </li>
                      ))}
                    </ul>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-accent)', padding: '0.5rem 0.75rem', borderRadius: '10px' }}>
                      💡 {activePlan.recommendedIf}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Action buttons */}
            <div className={styles.actionStack}>
              <Link
                href="/courses/java-zero-to-hero"
                className="btn btn-primary"
                style={{ textAlign: 'center', width: '100%', padding: '0.9rem' }}
              >
                🚀 Comenzar Curso Adaptado a {resultProfile.title}
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
                  ✓ Perfil sincronizado con tu cuenta
                </div>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className={styles.navBtn}
                style={{ alignSelf: 'center', fontSize: '0.85rem' }}
              >
                🔄 Repetir test de preguntas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
