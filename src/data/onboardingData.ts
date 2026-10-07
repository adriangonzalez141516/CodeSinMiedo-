export interface LearningProfile {
  id: 'visual' | 'tecnico' | 'realista';
  title: string;
  tag: string;
  icon: string;
  accentColor: string;
  gradient: string;
  explanationType: 'graphic' | 'technical' | 'simplified';
  headline: string;
  description: string;
  superpowers: string[];
  priorityAdvice: string;
}

export interface LearningPlan {
  id: 'autoestudio' | 'grupal' | 'mentoria';
  name: string;
  tierNumber: string;
  badge: string;
  priceNote: string;
  icon: string;
  headline: string;
  features: string[];
  recommendedIf: string;
}

export interface QuestionOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  profileWeight?: {
    visual?: number;
    tecnico?: number;
    realista?: number;
  };
  planPreference?: 'autoestudio' | 'grupal' | 'mentoria';
  timeCommitment?: 'low' | 'mid' | 'high';
}

export interface OnboardingQuestion {
  id: number;
  stepName: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

export const LEARNING_PROFILES: Record<string, LearningProfile> = {
  visual: {
    id: 'visual',
    title: 'Desarrollador Visual',
    tag: 'Mente Espacial & Esquemas',
    icon: '🎨',
    accentColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    explanationType: 'graphic',
    headline: 'Comprendes el mundo a través de imágenes, diagramas y metáforas espaciales.',
    description: 'Para ti, el código cobra sentido cuando ves cómo se conectan las piezas. La teoría seca en blanco y negro te aburre, pero cuando ves un esquema con colores, bloques y flechas, haces "clic" al instante.',
    superpowers: [
      'Capacidad para mapear mentalmente flujos y arquitecturas de datos',
      'Gran intuición para la interfaz de usuario (UI/UX) y componentes visuales',
      'Alta retención con diagramas, metáforas cotidianas y animaciones'
    ],
    priorityAdvice: 'Configuraremos tu visor para priorizar explicaciones gráficas, esquemas de bloques y analogías visuales.'
  },
  tecnico: {
    id: 'tecnico',
    title: 'Desarrollador Técnico',
    tag: 'Arquitecto Riguroso & Bajo Nivel',
    icon: '⚙️',
    accentColor: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    explanationType: 'technical',
    headline: 'Te apasiona entender qué ocurre bajo el capó de la máquina.',
    description: 'No te conformas con un "funciona y ya". Quieres saber cómo se gestiona la memoria, qué pasa en compilación, la jerarquía de tipos y la estructura formal sin metáforas innecesarias.',
    superpowers: [
      'Pensamiento metódico y diagnóstico analítico de bugs',
      'Pasión por el código limpio, tipado robusto y optimización de rendimiento',
      'Facilidad para bucear en documentación oficial y especificaciones'
    ],
    priorityAdvice: 'Configuraremos tu visor para mostrarte primero la sintaxis formal, gestión de memoria y desgloses técnicos sin rodeos.'
  },
  realista: {
    id: 'realista',
    title: 'Desarrollador Realista / Práctico',
    tag: 'Builder Orientado a Resultados',
    icon: '🚀',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    explanationType: 'simplified',
    headline: 'Aprendes construyendo proyectos útiles que resuelven problemas reales.',
    description: 'La teoría abstracta te satura si no ves para qué sirve en la vida real. Tu pregunta favorita es: "¿Qué puedo construir con esto hoy?". Buscas prototipar rápido y ver utilidades tangibles.',
    superpowers: [
      'Velocidad para prototipar y lanzar soluciones funcionales',
      'Foco obsesivo en la utilidad real y en el valor para el usuario final',
      'Aprendizaje ágil mediante el ensayo, error y código vivo'
    ],
    priorityAdvice: 'Configuraremos tu visor para enseñarte casos de uso del día a día, código directo al grano y explicaciones simplificadas.'
  }
};

export const LEARNING_PLANS: Record<string, LearningPlan> = {
  'autoestudio': {
    id: 'autoestudio',
    name: 'Tier 1: Autoestudio',
    tierNumber: 'Nivel 1',
    badge: '100% Flexible',
    priceNote: '29 €/mes',
    icon: '⚡',
    headline: 'Catálogo grabado completo + canal de dudas asíncrono para avanzar a tu propio ritmo.',
    features: [
      'Acceso total e ilimitado a todos los cursos y temarios grabados',
      'Explicaciones ordenadas según tu perfil (Visual, Técnico o Realista)',
      'Canal de dudas asíncrono en la plataforma con soporte',
      'Prácticas y retos guiados con código corregido paso a paso',
      '0 horas de directo: total libertad y autonomía'
    ],
    recommendedIf: 'Ideal si tienes horarios cambiantes y prefieres avanzar a tu propio ritmo sin depender de sesiones programadas.'
  },
  'grupal': {
    id: 'grupal',
    name: 'Tier 2: Bootcamp Grupal',
    tierNumber: 'Nivel 2',
    badge: 'Recomendado / Más Popular',
    priceNote: '59 €/mes',
    icon: '🔥',
    headline: 'Todo el contenido + 2 tutorías grupales al mes (grupos de 5) + 1 webinar temático mensual.',
    features: [
      'Todo lo incluido en el Plan Autoestudio sin restricciones',
      '2 tutorías grupales al mes de 60 minutos en grupos de 5 alumnos',
      '1 webinar temático mensual en directo para profundizar',
      'Horarios fijos semanales (sesiones grabadas íntegras en la plataforma)',
      'Revisión en vivo de código y feedback directo con compañeros'
    ],
    recommendedIf: 'Perfecto si te motiva el compromiso de grupo, las tutorías en vivo y el feedback constante quincenal.'
  },
  'mentoria': {
    id: 'mentoria',
    name: 'Tier 3: Mentoría 1 a 1',
    tierNumber: 'Nivel 3',
    badge: 'Solo 6 plazas al mes',
    priceNote: '149 €/mes',
    icon: '👑',
    headline: 'Todo el Plan Grupal + 2 sesiones privadas 1 a 1 de 45 minutos al mes conmigo.',
    features: [
      'Todo lo incluido en el Plan Grupal (catálogo, canal, tutorías y webinars)',
      '2 sesiones privadas 1 a 1 de 45 minutos al mes (seguimiento individual)',
      'Revisión y auditoría personalizada de tu código y proyectos',
      'Resolución directa de bloqueos en pantalla compartida',
      'Cupo estrictamente limitado a 6 alumnos al mes para máxima atención'
    ],
    recommendedIf: 'La mejor opción si buscas acelerar al máximo y contar con un mentor dedicado a tu caso específico.'
  }
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 1,
    stepName: 'Estilo de Asimilación',
    title: 'Cuando aprendes un concepto abstracto nuevo, ¿qué te ayuda a hacer "clic"?',
    subtitle: 'Elige la opción que mejor describa tu primer impulso mental.',
    options: [
      {
        id: 'q1_visual',
        icon: '🎨',
        title: 'Ver un esquema, dibujo o diagrama de flujo',
        subtitle: 'Necesito la imagen global: analogías visuales, flechas y cómo encajan las piezas.',
        profileWeight: { visual: 3, tecnico: 0, realista: 0 }
      },
      {
        id: 'q1_tecnico',
        icon: '⚙️',
        title: 'Ver la sintaxis exacta y cómo funciona en memoria',
        subtitle: 'Prefiero saber las reglas estrictas del lenguaje y qué pasa por debajo sin adornos.',
        profileWeight: { visual: 0, tecnico: 3, realista: 0 }
      },
      {
        id: 'q1_realista',
        icon: '🚀',
        title: 'Ver un ejemplo práctico del mundo real',
        subtitle: 'Dime para qué se usa en una aplicación real o cómo resuelve un problema cotidiano.',
        profileWeight: { visual: 0, tecnico: 0, realista: 3 }
      }
    ]
  },
  {
    id: 2,
    stepName: 'Resolución de Errores',
    title: 'Si te encuentras con un fallo o bug complejo que no compila, ¿cuál es tu instinto?',
    subtitle: 'Nos ayuda a afinar el tipo de pistas y explicaciones que mejor te funcionarán.',
    options: [
      {
        id: 'q2_tecnico',
        icon: '🔍',
        title: 'Desglosar el error línea a línea y buscar en la documentación',
        subtitle: 'Analizo el stack trace, verifico tipos de datos y aplico el método deductivo.',
        profileWeight: { visual: 0, tecnico: 3, realista: 0 }
      },
      {
        id: 'q2_visual',
        icon: '🗺️',
        title: 'Dibujarme mentalmente el camino que siguen los datos',
        subtitle: 'Intento visualizar en qué punto del recorrido se ha perdido o roto la información.',
        profileWeight: { visual: 3, tecnico: 0, realista: 0 }
      },
      {
        id: 'q2_realista',
        icon: '💡',
        title: 'Comparar con un ejemplo mínimo funcionando y experimentar',
        subtitle: 'Pruebo soluciones directas, comento líneas y adapto un código similar que sí funcione.',
        profileWeight: { visual: 0, tecnico: 0, realista: 3 }
      }
    ]
  },
  {
    id: 3,
    stepName: 'Motivación & Satisfacción',
    title: '¿Qué te genera mayor satisfacción al escribir código?',
    subtitle: 'Queremos conectar tus proyectos con lo que de verdad te ilusiona.',
    options: [
      {
        id: 'q3_realista',
        icon: '🛠️',
        title: 'Crear una herramienta que funcione y sirva para algo útil',
        subtitle: 'Ver que hace una tarea real, automatiza algo o que la puede usar otra persona.',
        profileWeight: { visual: 0, tecnico: 0, realista: 3 }
      },
      {
        id: 'q3_visual',
        icon: '✨',
        title: 'Diseñar la pantalla y ver cómo todo responde visualmente',
        subtitle: 'La magia de interactuar con botones, cambios de estado y ver el resultado en pantalla.',
        profileWeight: { visual: 3, tecnico: 0, realista: 0 }
      },
      {
        id: 'q3_tecnico',
        icon: '🧠',
        title: 'Sentir que la lógica es limpia, eficiente y elegante',
        subtitle: 'La satisfacción de un algoritmo bien resuelto, sin redundancias y sólido.',
        profileWeight: { visual: 0, tecnico: 3, realista: 0 }
      }
    ]
  },
  {
    id: 4,
    stepName: 'Modalidad de Acompañamiento',
    title: 'A la hora de aprender, ¿qué formato te ayuda a mantener el foco?',
    subtitle: 'Para sugerirte el nivel de acompañamiento más adecuado.',
    options: [
      {
        id: 'q4_grupal',
        icon: '👥',
        title: 'Tutorías en directo y grupo reducido (Bootcamp Grupal)',
        subtitle: 'Me motiva tener 2 tutorías al mes de 60 min en grupos de 5 y 1 webinar mensual para resolver dudas en vivo.',
        planPreference: 'grupal',
        profileWeight: { visual: 1, tecnico: 1, realista: 1 }
      },
      {
        id: 'q4_autoestudio',
        icon: '⚡',
        title: '100% a mi ritmo (Autoestudio)',
        subtitle: 'Prefiero consumir los vídeos y retos en mis propios horarios con canal de dudas asíncrono.',
        planPreference: 'autoestudio',
        profileWeight: { visual: 0, tecnico: 0, realista: 0 }
      },
      {
        id: 'q4_mentoria',
        icon: '🎯',
        title: 'Mentoría privada 1 a 1 personalizada',
        subtitle: 'Busco máxima aceleración con 2 sesiones privadas de 45 min al mes para revisar mi código a fondo.',
        planPreference: 'mentoria',
        profileWeight: { visual: 1, tecnico: 1, realista: 1 }
      }
    ]
  }
];
