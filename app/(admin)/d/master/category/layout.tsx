import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category | Admin Dashboard',
  description: 'Manage Category - Create, view, update and delete categories',
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}