"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import CellAction from "./CellAction";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
  category: string;
  images: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

/* TODO calendar sort and status sort */
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "images",
    cell: ({ row }) => {
      console.log(row.original.images, "images");

      return (
        <div className="table-cell">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height={64}
            width={64}
            src={row.original.images[0]}
          />
        </div>
      );
    },
  },
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <span
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },

  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { quantity } = row.original;

      return (
        <div>
          {quantity === 0 ? (
            <>
              <Badge variant={"destructive"}>Sold out</Badge>
            </>
          ) : quantity < 10 ? (
            <div className="flex gap-x-4">
              {quantity} <Badge variant={"low"}>Low stock</Badge>
            </div>
          ) : (
            quantity
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: "Status",
    cell: ({ row }) => {
      console.log(row.getValue("isArchived"));
      return (
        <Badge
          className="capitalize"
          variant={
            row.getValue("isArchived") === false ? "green" : "destructive"
          }
        >
          {row.getValue("isArchived") === false ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    cell: ({ row }) => {
      console.log(row.getValue("isFeatured"));

      return (
        <Badge
          className="capitalize"
          variant={
            row.getValue("isFeatured") === true ? "green" : "destructive"
          }
        >
          {row.getValue("isFeatured") === true ? "Active" : "Inactive"}
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
