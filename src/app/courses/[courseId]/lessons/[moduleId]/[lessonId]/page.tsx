import { getLessonById } from '@/api';
import { notFound } from 'next/navigation';
import { LessonWorkspaceClient } from './LessonWorkspaceClient';

// SECURE FRONT/BACK: Data fetching happens server-side only. No client fetching logic.
export default async function PlatformLessonPage({
  params
}: {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
}) {
  const { courseId, moduleId, lessonId } = await params;
  
  const lesson = await getLessonById(courseId, moduleId, lessonId);
  if (!lesson) {
    notFound();
  }

  // The key={lesson.id} ensures the Client Component fully resets its internal state (like active tab, scroll position) when changing lessons!
  return <LessonWorkspaceClient key={lesson.id} lesson={lesson} />;
}
