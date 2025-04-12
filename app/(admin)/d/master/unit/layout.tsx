import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Units | Admin Dashboard',
  description: 'Manage Units - Create, view, update and delete units',
};

export default function UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}