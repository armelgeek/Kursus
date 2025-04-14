'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/chapter/components/organisms/columns';
import { useChapters } from '@/features/chapter/hooks/use-chapter';
import { Add } from '@/features/chapter/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function ChapterPage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useChapters(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Manage Chapters</h2>
          <p className="text-muted-foreground">
            You can create, edit, and delete chapters here.
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