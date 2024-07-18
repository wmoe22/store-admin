"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import CellAction from "./CellAction";

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "Image",
    cell: ({ row }) => (
      <div className="table-cell">
        <Image
          alt="Product image"
          className="aspect-square object-center rounded-md object-cover"
          height={64}
          width={64}
          src={row.original.imageUrl}
        />
      </div>
    ),
  },
  {
    accessorKey: "label",
    header: "Label",
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
