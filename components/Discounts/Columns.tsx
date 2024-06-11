"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import CellAction from "./CellAction";

export type DiscountColumn = {
  id: string;
  name: string;
  percentage: number;
  isArchived: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export const columns: ColumnDef<DiscountColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Coupon Code",
  },
  {
    accessorKey: "product",
    header: "Product",
  },

  {
    accessorKey: "isArchived",
    header: "Active",
  },
  {
    accessorKey: "startDate",
    header: "StartDate",
  },
  {
    accessorKey: "endDate",
    header: "EndDate",
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
