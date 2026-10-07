-- ==========================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS (SUPABASE)
-- Pega todo este código en el SQL Editor de tu proyecto Supabase
-- ==========================================

-- 1. Tabla de Cursos
CREATE TABLE courses (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  level text NOT NULL, -- 'Junior Level 0', 'Beginner', 'Intermediate'
  audience text[] NOT NULL DEFAULT '{}',
  thumbnail_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Módulos (Relacionados con Cursos)
CREATE TABLE modules (
  id text PRIMARY KEY,
  course_id text REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0, -- Para ordenar los módulos (1, 2, 3...)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Lecciones (Relacionadas con Módulos)
CREATE TABLE lessons (
  id text PRIMARY KEY,
  module_id text REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  type text NOT NULL, -- 'video' o 'text'
  content_url text,
  description text NOT NULL,
  content_blocks jsonb, -- Array de bloques de contenido estructurado (text, code, highlight)
  order_index integer NOT NULL DEFAULT 0, -- Para ordenar las lecciones
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabla de Explicaciones Alternativas (Relacionadas con Lecciones)
CREATE TABLE alternative_explanations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id text REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- 'graphic', 'technical', 'simplified'
  content_url text,
  description text NOT NULL,
  content_blocks jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabla de Prácticas (Relacionadas con Lecciones)
CREATE TABLE practices (
  id text PRIMARY KEY,
  lesson_id text REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  solution_video_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)
-- ==========================================
-- Activar RLS en todas las tablas
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE alternative_explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (Cualquiera puede leer el temario)
CREATE POLICY "Public read access for courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read access for modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Public read access for lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public read access for alternative_explanations" ON alternative_explanations FOR SELECT USING (true);
CREATE POLICY "Public read access for practices" ON practices FOR SELECT USING (true);
