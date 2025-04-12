'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Course } from '@/features/course/config/course.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Course>[] = [
  {
    id: 'title',
    meta: 'Name',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('title')}</div>;
    },
  },
  {
    id: 'image',
    meta: 'Image',
    accessorKey: 'imageSrc',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const imageSrc = row.original.imageSrc || '' as string;
      return (
        <div className="flex items-center">
          <img
            src={imageSrc}
            alt="Course"
            className="h-10 w-10 object-cover rounded"
          />
        </div>
      );
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];