import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChallengeOptions | Admin Dashboard',
  description: 'Manage ChallengeOptions - Create, view, update and delete challengeOptions',
};

export default function ChallengeOptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}