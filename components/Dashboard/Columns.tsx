"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export type OrderColumn = {
  id: string;
  isPaid: boolean;
  address: string;
  amount: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
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
          variant={row.getValue("isPaid") ? "default" : "destructive"}
        >
          {row.getValue("isPaid") ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  /* TODO:week/month/year */
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.getValue("amount")}</Badge>
    ),
  },
];
