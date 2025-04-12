'use client';
  
  import { DataTable } from '@/shared/components/molecules/datatable/data-table';
  import { columns } from '@/features/challenge/components/organisms/columns';
  import { useChallenges } from '@/features/challenge/hooks/use-challenge';
  import { Add } from '@/features/challenge/components/organisms/add';
  import { useTableParams } from '@/shared/hooks/use-table-params';
  
  export default function ChallengePage() {
    const { params, tableProps } = useTableParams();
    const { data, meta, isLoading } = useChallenges(params);
  
    return (
      <div className="space-y-4">
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className="text-2xl font-bold tracking-tight">Manage Challenges</h2>
            <p className="text-muted-foreground">
              You can create, edit, and delete challenges here.
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