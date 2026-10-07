export type ContentBlock = 
  | { type: 'text'; html: string }
  | { type: 'code'; code: string; language?: string; filename?: string }
  | { type: 'highlight'; style: 'primary' | 'secondary' | 'success'; title: string; html: string; icon: string };

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  contentUrl: string;
  description: string;
  contentBlocks?: ContentBlock[];
  alternativeExplanations?: {
    type: 'graphic' | 'technical' | 'simplified';
    contentUrl: string;
    description: string;
    contentBlocks?: ContentBlock[];
  }[];
  practices?: {
    id: string;
    title: string;
    description: string;
    solutionVideoUrl: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Junior Level 0' | 'Beginner' | 'Intermediate';
  audience: string[];
  thumbnailUrl: string;
  modules: Module[];
}

export const mockCourses: Course[] = [
  {
    id: 'java-zero-to-hero',
    title: 'Aprende a Programar desde Cero (con Java)',
    description: 'El curso definitivo para entender la programación sin importar tu edad o experiencia. Conceptos universales explicados de forma sencilla utilizando Java como herramienta.',
    level: 'Junior Level 0',
    audience: ['Niños', 'Adultos Mayores', 'Estudiantes', 'Curiosos'],
    thumbnailUrl: '/placeholder.jpg',
    modules: [
      {
        id: 'mod-1',
        title: 'Módulo 1: ¿Qué es un programa?',
        description: 'Entiende cómo las computadoras siguen instrucciones.',
        lessons: [
          {
            id: 'les-1',
            title: '¿Qué es un algoritmo?',
            type: 'video',
            contentUrl: '/videos/algo-main.mp4',
            description: 'Una receta de cocina como algoritmo.',
            contentBlocks: [
              { type: 'text', html: '<p style="color: var(--text-primary); font-weight: 500">Un algoritmo no es más que una serie ordenada de pasos finitos para resolver un problema concreto o realizar una tarea.</p>' },
              { type: 'text', html: '<p>Imagina una receta de cocina: primero preparas los ingredientes, luego enciendes el fuego y finalmente cocinas durante 20 minutos. Si alteras el orden (por ejemplo, comer antes de cocinar), el resultado no funcionará.</p>' },
              { type: 'code', filename: 'Ejemplo.java', language: 'java', code: 'int puntuacion = 100;\nSystem.out.println("Puntuación inicial: " + puntuacion);' }
            ],
            alternativeExplanations: [
              {
                type: 'graphic',
                contentUrl: '/videos/algo-graphic.mp4',
                description: 'Explicación visual con bloques de lego.',
                contentBlocks: [
                  { type: 'highlight', style: 'secondary', icon: '🧱', title: 'Analogía Visual de Bloques:', html: 'Imagina los algoritmos como piezas de un puzle o bloques de construcción. Cada bloque encaja solo si el anterior ha dejado la base lista.' },
                  { type: 'text', html: '<p>En lugar de pensar en código abstracto, visualiza una cinta transportadora: entra un dato crudo (ingrediente) ➔ pasa por la máquina 1 (procesado) ➔ sale el resultado terminado.</p>' },
                  { type: 'code', filename: 'Bloques.java', language: 'java', code: 'Bloque base = new Bloque("Ingrediente");\nBloque procesado = maquina.procesar(base);\nSystem.out.println(procesado.obtenerResultado());' }
                ]
              },
              {
                type: 'technical',
                contentUrl: '/videos/algo-tech.mp4',
                description: 'Explicación más cercana al código real.',
                contentBlocks: [
                  { type: 'highlight', style: 'primary', icon: '⚙️', title: 'Especificación Técnica:', html: 'Un algoritmo es una función determinista que mapea un espacio de entrada <em>Input(I)</em> a una salida <em>Output(O)</em> con complejidad finita temporal <em>O(n)</em> y espacial.' },
                  { type: 'text', html: '<p>En la JVM de Java, las instrucciones secuenciales son compiladas a bytecode y ejecutadas por el thread principal en el stack de llamadas.</p>' },
                  { type: 'code', filename: 'Algoritmo.java', language: 'java', code: 'public int calcularO(int n) {\n  int operacion = 0;\n  for(int i = 0; i < n; i++) {\n    operacion += i;\n  }\n  return operacion;\n}' },
                  { type: 'text', html: '<p>Fíjate cómo el bucle superior tiene una complejidad O(n) lineal.</p>' }
                ]
              }
            ],
            practices: [
              {
                id: 'prac-1',
                title: 'Tu primer algoritmo matutino',
                description: 'Escribe paso a paso cómo te preparas por las mañanas.',
                solutionVideoUrl: '/videos/algo-prac1-sol.mp4'
              }
            ]
          },
          {
            id: 'les-2',
            title: 'Variables: Cajas de información',
            type: 'video',
            contentUrl: '/videos/vars-main.mp4',
            description: 'Aprende a guardar datos en la memoria.',
            practices: [
              {
                id: 'prac-2',
                title: 'Clasifica las cajas',
                description: 'Asigna diferentes tipos de datos a variables de Java.',
                solutionVideoUrl: '/videos/vars-prac2-sol.mp4'
              }
            ]
          }
        ]
      }
    ]
  }
];
