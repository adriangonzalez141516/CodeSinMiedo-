import { supabase } from '@/lib/supabase';
import { Course, Module, Lesson } from '../mocks/db';

// Mapea los datos de Supabase (snake_case) al formato del frontend (camelCase)
function mapCourseFromDB(dbCourse: any): Course {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description,
    level: dbCourse.level,
    audience: dbCourse.audience,
    thumbnailUrl: dbCourse.thumbnail_url,
    modules: dbCourse.modules?.map((m: any): Module => ({
      id: m.id,
      title: m.title,
      description: m.description,
      lessons: m.lessons?.map((l: any): Lesson => ({
        id: l.id,
        title: l.title,
        type: l.type,
        contentUrl: l.content_url,
        description: l.description,
        contentBlocks: l.content_blocks || [],
        alternativeExplanations: l.alternative_explanations?.map((alt: any) => ({
          type: alt.type,
          contentUrl: alt.content_url,
          description: alt.description,
          contentBlocks: alt.content_blocks || [],
        })),
        practices: l.practices?.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          solutionVideoUrl: p.solution_video_url,
        }))
      })) || []
    })) || []
  };
}

export async function getCourses(): Promise<Course[]> {
  const { data: courses, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (
        *,
        lessons (
          *,
          alternative_explanations (*),
          practices (*)
        )
      )
    `);

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  // Ordenar módulos y lecciones (Supabase no garantiza orden en anidados sin un order explícito)
  courses.forEach(c => {
    c.modules.sort((a: any, b: any) => a.order_index - b.order_index);
    c.modules.forEach((m: any) => {
      m.lessons.sort((a: any, b: any) => a.order_index - b.order_index);
    });
  });

  return courses.map(mapCourseFromDB);
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (
        *,
        lessons (
          *,
          alternative_explanations (*),
          practices (*)
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error || !course) return null;

  course.modules.sort((a: any, b: any) => a.order_index - b.order_index);
  course.modules.forEach((m: any) => {
    m.lessons.sort((a: any, b: any) => a.order_index - b.order_index);
  });

  return mapCourseFromDB(course);
}

export async function getLessonById(courseId: string, moduleId: string, lessonId: string): Promise<Lesson | null> {
  const course = await getCourseById(courseId);
  if (!course) return null;
  
  const module = course.modules.find(m => m.id === moduleId);
  if (!module) return null;
  
  return module.lessons.find(l => l.id === lessonId) || null;
}
