"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  quantity: number;
  price: number;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "isPaid",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className="capitalize"
          variant={row.getValue("isPaid") ? "green" : "destructive"}
        >
          {row.getValue("isPaid") ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  /* TODO:week/month/year */
  {
    accessorKey: "price",
    header: "Unit Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "grandTotal",
    header: "GrandTotal",
  },
];
