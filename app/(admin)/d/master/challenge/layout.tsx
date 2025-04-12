import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Challenges | Admin Dashboard',
  description: 'Manage Challenges - Create, view, update and delete challenges',
};

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}