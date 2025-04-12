'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/lesson/components/organisms/columns';
import { useLessons } from '@/features/lesson/hooks/use-lesson';
import { Add } from '@/features/lesson/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function LessonPage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useLessons(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Manage Lessons</h2>
          <p className="text-muted-foreground">
            You can create, edit, and delete lessons here.
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