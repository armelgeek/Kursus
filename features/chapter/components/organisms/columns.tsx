'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Chapter } from '@/features/chapter/config/chapter.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Chapter>[] = [
  {
    id: 'title',
    meta: 'Title',
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('title')}</div>;
    },
  },
  {
    id: 'type',
    meta: 'Type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('type')}</div>;
    },
  },
  /**{
    id: 'content',
    meta: 'Content',
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('content')}</div>;
    },
  },**/
  ,
  {
    id: 'lesson',
    meta: 'Lesson',
    accessorKey: 'lesson',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lesson" />
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
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('order')}</div>;
    },
  },
  {
    id: 'mediaUrl',
    meta: 'Media URL',
    accessorKey: 'mediaUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media URL" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('mediaUrl')}</div>;
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];