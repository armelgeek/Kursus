import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chapters | Admin Dashboard',
  description: 'Manage Chapters - Create, view, update and delete chapters',
};

export default function ChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}