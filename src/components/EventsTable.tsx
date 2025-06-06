import { DataTableColumnHeader } from "@/components/table/column-header";
import { DataTable } from "@/components/table/data-table";
import { DataTableRowActions } from "@/components/table/row-actions";
import { Event } from "@/api/events/types";
import { EventStatusBadge } from "@/components/EventStatusBadge";
import { ColumnDef } from "@tanstack/react-table";

interface EventsTableProps {
  events: Event[];
  onView?: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

const getEventStatus = (event: Event) => {
  const now = new Date();
  const dateFrom = event.dateFrom ? new Date(event.dateFrom) : null;
  const dateTo = event.dateTo ? new Date(event.dateTo) : null;

  if (dateTo && now > dateTo) return "ended";
  if (dateFrom && now >= dateFrom) return "ongoing";
  return "planned";
};

const formatPolishDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const columns: ColumnDef<Event>[] = [
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
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lokalizacja" />
    ),
    cell: ({ row }) => {
      const event = row.original;
      return <div>{event.location.name}</div>;
    },
  },
  {
    accessorKey: "dateFrom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data rozpoczęcia" />
    ),
    cell: ({ row }) => {
      const dateFrom = row.getValue("dateFrom") as string;
      return <div>{formatPolishDateTime(dateFrom)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const event = row.original;
      return <EventStatusBadge status={getEventStatus(event)} />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cena" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div>{price > 0 ? `${price} zł` : "Bezpłatny"}</div>;
    },
  },
];

export const EventsTable = ({ events, onDelete }: EventsTableProps) => {
  const columnsWithActions: ColumnDef<Event>[] = [
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
      data={events}
      searchKey="name"
      searchPlaceholder="Szukaj eventów..."
    />
  );
};
