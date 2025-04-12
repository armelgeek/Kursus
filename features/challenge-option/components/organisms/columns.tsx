'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { ChallengeOption } from '@/features/challenge-option/config/challenge-option.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<ChallengeOption>[] = [
  {
    id: 'text',
    meta: 'Text',
    accessorKey: 'text',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Text"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('text')}</div>;
    },
  },
  {
    id: 'correct',
    meta: 'Correct',
    accessorKey: 'correct',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Correct"
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue('correct') as boolean;
      return <div className="flex w-full">{value ? 'Yes' : 'No'}</div>;
    },
  },
  {
    id: 'challenge',
    meta: 'Challenge',
    accessorKey: 'challenge',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Challenge"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('challenge').question}</div>;
    },
  },
  {
    id: 'imageSrc',
    meta: 'Image',
    accessorKey: 'imageSrc',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const imageSrc = row.getValue('imageSrc') as string;
      return (
        <div className="flex w-full">
          <img src={imageSrc} alt="Image" className="h-10 w-10 object-cover" />
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