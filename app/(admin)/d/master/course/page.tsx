'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/course/components/organisms/columns';
import { useCourses } from '@/features/course/hooks/use-course';
import { Add } from '@/features/course/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function CoursePage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useCourses(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Manage Courses</h2>
          <p className="text-muted-foreground">
            You can create, edit, and delete courses here.
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