import { DataTableColumnHeader } from "@/components/table/column-header";
import { DataTable } from "@/components/table/data-table";
import { DataTableRowActions } from "@/components/table/row-actions";
import { Location } from "@/types/models";
import { ColumnDef } from "@tanstack/react-table";

interface LocationsTableProps {
  locations: Location[];
  onView?: (location: Location) => void;
  onEdit?: (location: Location) => void;
  onDelete?: (location: Location) => void;
}

const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwa" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Adres" />
    ),
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
];

export const LocationsTable = ({
  locations,
  onDelete,
}: LocationsTableProps) => {
  const columnsWithActions: ColumnDef<Location>[] = [
    ...columns,
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onDelete={() => onDelete?.(row.original)}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columnsWithActions}
      data={locations}
      searchKey="name"
      searchPlaceholder="Szukaj lokalizacji..."
    />
  );
};
