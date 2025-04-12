'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Lesson } from '@/features/lesson/config/lesson.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Lesson>[] = [
  {
    id: 'title',
    meta: 'Title',
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
    id: 'order',
    meta: 'Order',
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('order')}</div>;
    },
  },
  {
    id: 'unit',
    meta: 'Unit',
    accessorKey: 'unit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Unit"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('unit').title}</div>;
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];