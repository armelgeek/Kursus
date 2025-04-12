import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses | Admin Dashboard',
  description: 'Manage Courses - Create, view, update and delete courses',
};

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}