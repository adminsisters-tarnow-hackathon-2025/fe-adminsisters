import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/table";

// Example data type
type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

// Example columns definition
export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <div className="capitalize">{status}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={(user) => console.log("View", user)}
        onEdit={(user) => console.log("Edit", user)}
        onDelete={(user) => console.log("Delete", user)}
      />
    ),
  },
];

// Example usage in component
export function UsersTable() {
  const data: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
    },
    // ...more data
  ];

  return (
    <DataTable
      columns={userColumns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search users..."
    />
  );
}
