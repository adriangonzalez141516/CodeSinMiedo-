'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export const EXPLANATION_MODES: Record<string, { label: string; tag: string; icon: string; summary: string }> = {
  main: {
    label: 'Principal',
    tag: 'Enfoque Principal',
    icon: '🎯',
    summary: 'Explicación estándar estructurada con analogías cotidianas.'
  },
  graphic: {
    label: 'Visual / Gráfico',
    tag: 'Enfoque Gráfico',
    icon: '🧩',
    summary: 'Basado en esquemas visuales, bloques de colores y metáforas espaciales.'
  },
  technical: {
    label: 'Técnico y Directo',
    tag: 'Enfoque Técnico',
    icon: '⚙️',
    summary: 'Directo al grano: sintaxis pura, gestión en memoria y arquitectura.'
  },
  simplified: {
    label: 'Simplificado',
    tag: 'Enfoque Simplificado',
    icon: '🌱',
    summary: 'Lenguaje ultra-sencillo paso a paso, sin jerga técnica.'
  }
};

type LessonContextType = {
  selectedExplanation: number;
  setSelectedExplanation: (val: number) => void;
  liveAnnouncement: string;
  setLiveAnnouncement: (val: string) => void;
};

const LessonContext = createContext<LessonContextType | null>(null);

export const useLessonContext = () => {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error('Missing LessonContext');
  return ctx;
};

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExplanation, setSelectedExplanation] = useState<number>(-1);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  return (
    <LessonContext.Provider value={{ selectedExplanation, setSelectedExplanation, liveAnnouncement, setLiveAnnouncement }}>
      {/* Screen reader live announcement global container */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>
      {children}
    </LessonContext.Provider>
  );
};
