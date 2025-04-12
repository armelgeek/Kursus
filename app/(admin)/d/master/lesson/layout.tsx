import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lessons | Admin Dashboard',
  description: 'Manage Lessons - Create, view, update and delete lessons',
};

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}