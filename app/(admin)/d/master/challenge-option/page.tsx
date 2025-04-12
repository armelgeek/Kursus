'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/challenge-option/components/organisms/columns';
import { useChallengeOptions } from '@/features/challenge-option/hooks/use-challenge-option';
import { Add } from '@/features/challenge-option/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function ChallengeOptionPage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useChallengeOptions(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Manage ChallengeOptions</h2>
          <p className="text-muted-foreground">
            You can create, edit, and delete challengeOptions here.
          </p>
        </div>
        <Add />
      </div>

      <DataTable
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}
      />
    </div>
  );
}