"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
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
        <img
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
      const [selectedFilter, setSelectedFilter] = useState("desc" || "asc");

      const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        column.toggleSorting(filter === "desc");
        console.log(filter);
      };

      return (
        <>
          <div className="flex items-center justify-between">
            <Label>Date</Label>

            <div className="flex gap-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "desc"}
                    onClick={() => handleFilterChange("desc")}
                  >
                    Latest (newest)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "asc"}
                    onClick={() => handleFilterChange("asc")}
                  >
                    Last added
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
