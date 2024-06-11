"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import CellAction from "./CellAction";

export type BrandColumn = {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "logo",
    cell: ({ row }) => (
      <div className="header-cell">
        <Image
          alt="logo"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={row.original.logo}
          width="64"
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
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
