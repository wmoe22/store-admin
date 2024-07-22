"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
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
    cell: ({ row }) => {
      return (
        <Link href={`orders/${row.getValue("id")}`}>{row.getValue("id")}</Link>
      );
    },
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
          variant={row.getValue("isPaid") ? "green" : "destructive"}
        >
          {row.getValue("isPaid") ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
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
      <Badge className="capitalize" variant={"green"}>
        {row.getValue("amount")}
      </Badge>
    ),
  },
];
