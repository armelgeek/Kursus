'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Challenge } from '@/features/challenge/config/challenge.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Challenge>[] = [
  {
    id: 'question',
    meta: 'Question',
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Question"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('question')}</div>;
    },
  },
  {
    id: 'type',
    meta: 'Type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('type')}</div>;
    },
  },
  {
    id: 'lesson',
    meta: 'Lesson',
    accessorKey: 'lesson',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lesson"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('lesson').title}</div>;
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
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
