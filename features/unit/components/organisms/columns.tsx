'use client';
  
  import { ColumnDef } from '@tanstack/react-table';
  
  import type { Unit } from '@/features/unit/config/unit.type';
  
  import { DataTableRowActions } from './data-table-row-actions';
  import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';
  
  export const columns: ColumnDef<Unit>[] = [
    {
      id: 'name',
      meta: 'Name',
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
        />
      ),
      cell: ({ row }) => {
        return <div className="flex w-full">{row.getValue('name')}</div>;
      },
    },
    {
      id: 'actions',
      maxSize: 75,
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
  