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
  id: 'self-paced' | 'mentorship';
  name: string;
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
  planPreference?: 'self-paced' | 'mentorship';
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
  'self-paced': {
    id: 'self-paced',
    name: 'Plan Autónomo (A tu ritmo)',
    badge: '100% Flexible',
    priceNote: '19€/mes o 149€/año',
    icon: '⚡',
    headline: 'Vídeos y retos adaptados a tu estilo, con total libertad horaria.',
    features: [
      'Acceso total a todos los cursos y temarios',
      'Vídeos y explicaciones ordenados según tu perfil de aprendizaje',
      'Editor interactivo con comprobación y feedback en tiempo real',
      'Apuntes y resúmenes descargables en PDF y Markdown',
      'A tu propio ritmo, sin fechas ni horarios fijos'
    ],
    recommendedIf: 'Ideal si tienes horarios cambiantes y prefieres avanzar de forma autodidacta sin depender de sesiones programadas.'
  },
  'mentorship': {
    id: 'mentorship',
    name: 'Plan Guiado + Mentoría Semanal Live',
    badge: 'Recomendado para ti',
    priceNote: 'Plazas limitadas por grupo',
    icon: '🔥',
    headline: 'Todo el contenido adaptado + 1 sesión semanal de 1 hora en directo conmigo.',
    features: [
      'Todo lo incluido en el Plan Autónomo sin restricciones',
      '1 Sesión Semanal en Directo (1 Hora) conmigo en grupo reducido',
      'Revisión en vivo de tu código y resolución inmediata de bloqueos',
      'Resolución de dudas en pantalla compartida y consejos profesionales',
      'Canal privado para interactuar con el profesor y otros compañeros',
      'Planificación semanal de objetivos para no procrastinar ni abandonar'
    ],
    recommendedIf: 'Perfecto si valoras el contacto humano directo, el feedback semanal para no atascarte y el compromiso de una cita en vivo.'
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
    title: 'Para progresar con constancia y no abandonar, ¿qué formato te resulta más efectivo?',
    subtitle: 'Estamos planeando sesiones en directo de 1 hora para interactuar con los alumnos.',
    options: [
      {
        id: 'q4_mentorship',
        icon: '🤝',
        title: 'Guiado con 1 sesión semanal de 1 hora en directo',
        subtitle: 'Me motiva tener una cita semanal para resolver dudas, revisar mi código en vivo y hablar con el profesor.',
        planPreference: 'mentorship',
        profileWeight: { visual: 1, tecnico: 1, realista: 1 }
      },
      {
        id: 'q4_selfpaced',
        icon: '⚡',
        title: '100% a mi ritmo con vídeos y retos interactivos',
        subtitle: 'Prefiero total flexibilidad horaria sin depender de un día u hora fijados para conectarme.',
        planPreference: 'self-paced',
        profileWeight: { visual: 0, tecnico: 0, realista: 0 }
      }
    ]
  },
  {
    id: 5,
    stepName: 'Disponibilidad Semanal',
    title: '¿Cuánto tiempo real puedes dedicarle cada semana?',
    subtitle: 'Para adaptar la duración y dosificación de los ejercicios a tu día a día.',
    options: [
      {
        id: 'q5_low',
        icon: '🌱',
        title: '1 a 3 horas semanales (Micro-aprendizaje)',
        subtitle: 'Poco a poco, con lecciones cortas de 10-15 minutos entre semana o los findes.',
        timeCommitment: 'low'
      },
      {
        id: 'q5_mid',
        icon: '🔥',
        title: '4 a 7 horas semanales (Progreso constante)',
        subtitle: 'Un ratito casi todos los días para consolidar hábitos sólidos de programación.',
        timeCommitment: 'mid'
      },
      {
        id: 'q5_high',
        icon: '🚀',
        title: 'Más de 7 horas semanales (Inmersión total)',
        subtitle: 'Quiero avanzar a fondo y aprender lo máximo posible en el menor tiempo.',
        timeCommitment: 'high'
      }
    ]
  }
];
