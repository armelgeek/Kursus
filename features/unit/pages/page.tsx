'use client';
  
  import { DataTable } from '@/shared/components/molecules/datatable/data-table';
  import { columns } from '@/features/unit/components/organisms/columns';
  import { useUnits } from '@/features/unit/hooks/use-unit';
  import { Add } from '@/features/unit/components/organisms/add';
  import { useTableParams } from '@/shared/hooks/use-table-params';
  
  export default function UnitPage() {
    const { params, tableProps } = useTableParams();
    const { data, meta, isLoading } = useUnits(params);
  
    return (
      <div className="space-y-4">
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <h2 className="text-2xl font-bold tracking-tight">Manage Units</h2>
            <p className="text-muted-foreground">
              You can create, edit, and delete units here.
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