import { getCourseById } from '@/api';
import { notFound } from 'next/navigation';
import { LessonProvider } from './LessonContext';
import { LessonLayoutClient } from './LessonLayoutClient';

export default async function LessonsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  
  // SECURE FRONT/BACK: Data fetching happens server-side.
  const course = await getCourseById(courseId);
  
  if (!course) {
    notFound();
  }

  return (
    <LessonProvider>
      <LessonLayoutClient course={course}>
        {children}
      </LessonLayoutClient>
    </LessonProvider>
  );
}
