-- ==========================================
-- SCRIPT DE INSERCIÓN DE DATOS (SEED)
-- Pega esto en el SQL Editor y dale a RUN
-- ==========================================

INSERT INTO courses (id, title, description, level, audience, thumbnail_url) VALUES 
('java-zero-to-hero', 'Aprende a Programar desde Cero (con Java)', 'El curso definitivo para entender la programación sin importar tu edad o experiencia. Conceptos universales explicados de forma sencilla utilizando Java como herramienta.', 'Junior Level 0', ARRAY['Niños', 'Adultos Mayores', 'Estudiantes', 'Curiosos'], '/placeholder.jpg');

INSERT INTO modules (id, course_id, title, description, order_index) VALUES 
('mod-1', 'java-zero-to-hero', 'Módulo 1: ¿Qué es un programa?', 'Entiende cómo las computadoras siguen instrucciones.', 1);

INSERT INTO lessons (id, module_id, title, type, content_url, description, content_blocks, order_index) VALUES 
('les-1', 'mod-1', '¿Qué es un algoritmo?', 'video', '/videos/algo-main.mp4', 'Una receta de cocina como algoritmo.', '[{"type":"text","html":"<p style=\"color: var(--text-primary); font-weight: 500\">Un algoritmo no es más que una serie ordenada de pasos finitos para resolver un problema concreto o realizar una tarea.</p>"},{"type":"text","html":"<p>Imagina una receta de cocina: primero preparas los ingredientes, luego enciendes el fuego y finalmente cocinas durante 20 minutos. Si alteras el orden (por ejemplo, comer antes de cocinar), el resultado no funcionará.</p>"},{"type":"code","code":"int puntuacion = 100;\nSystem.out.println(\"Puntuación inicial: \" + puntuacion);","language":"java","filename":"Ejemplo.java"}]'::jsonb, 1),
('les-2', 'mod-1', 'Variables: Cajas de información', 'video', '/videos/vars-main.mp4', 'Aprende a guardar datos en la memoria.', '[]'::jsonb, 2);

INSERT INTO alternative_explanations (lesson_id, type, content_url, description, content_blocks) VALUES 
('les-1', 'graphic', '/videos/algo-graphic.mp4', 'Explicación visual con bloques de lego.', '[{"icon":"🧱","html":"Imagina los algoritmos como piezas de un puzle o bloques de construcción. Cada bloque encaja solo si el anterior ha dejado la base lista.","type":"highlight","style":"secondary","title":"Analogía Visual de Bloques:"},{"type":"text","html":"<p>En lugar de pensar en código abstracto, visualiza una cinta transportadora: entra un dato crudo (ingrediente) ➔ pasa por la máquina 1 (procesado) ➔ sale el resultado terminado.</p>"},{"type":"code","code":"Bloque base = new Bloque(\"Ingrediente\");\nBloque procesado = maquina.procesar(base);\nSystem.out.println(procesado.obtenerResultado());","language":"java","filename":"Bloques.java"}]'::jsonb),
('les-1', 'technical', '/videos/algo-tech.mp4', 'Explicación más cercana al código real.', '[{"icon":"⚙️","html":"Un algoritmo es una función determinista que mapea un espacio de entrada <em>Input(I)</em> a una salida <em>Output(O)</em> con complejidad finita temporal <em>O(n)</em> y espacial.","type":"highlight","style":"primary","title":"Especificación Técnica:"},{"type":"text","html":"<p>En la JVM de Java, las instrucciones secuenciales son compiladas a bytecode y ejecutadas por el thread principal en el stack de llamadas.</p>"},{"type":"code","code":"public int calcularO(int n) {\n  int operacion = 0;\n  for(int i = 0; i < n; i++) {\n    operacion += i;\n  }\n  return operacion;\n}","language":"java","filename":"Algoritmo.java"},{"type":"text","html":"<p>Fíjate cómo el bucle superior tiene una complejidad O(n) lineal.</p>"}]'::jsonb);

INSERT INTO practices (id, lesson_id, title, description, solution_video_url) VALUES 
('prac-1', 'les-1', 'Tu primer algoritmo matutino', 'Escribe paso a paso cómo te preparas por las mañanas.', '/videos/algo-prac1-sol.mp4'),
('prac-2', 'les-2', 'Clasifica las cajas', 'Asigna diferentes tipos de datos a variables de Java.', '/videos/vars-prac2-sol.mp4');
