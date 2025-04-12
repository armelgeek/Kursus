'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Unit } from '@/features/unit/config/unit.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Unit>[] = [
  {
    id: 'title',
    meta: 'title',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="title"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('title')}</div>;
    },
  },
  {
    id: 'order',
    meta: 'order',
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
    id: 'course',
    meta: 'course',
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Course"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('course').title}</div>;
    },
  },
  {
    id: 'description',
    meta: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('description')}</div>;
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];