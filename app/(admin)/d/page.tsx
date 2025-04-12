'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatsCard } from '@/shared/components/molecules/dashboard';

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return {
        data: [
          {
            id: 1,
            name: 'Courses',
            icon:  <svg />,
            value: 100,
          },
          {
            id: 2,
            name: 'Users',
            icon: <svg />,
            value: 200,
          },
          {
            id: 3,
            name: 'Challenges',
            icon:  <svg />,
            value: 10,
          },
        ]
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">
          Bienvenue dans votre espace d'administration
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.data.map((stat) => (
          <StatsCard
            title={stat.name}
            value={Number(stat.value) ?? 0}
            icon={stat.icon}
            key={stat.id}
            description=''
          />
          ))}
      </div>
    </div>
  );
}
