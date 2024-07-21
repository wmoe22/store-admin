"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, File, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs } from "./ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CSVLink } from "react-csv";
import { Data } from "react-csv/lib/core";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  route: string;
}

export function RefineDataTable<TData, TValue>({
  columns,
  data,
  route,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const params = useParams();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  /*  <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger
                    value="week"
                    onClick={() =>
                      setSorting([{ id: "createdAt", desc: false }])
                    }
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    onClick={() =>
                      setSorting([{ id: "createdAt", desc: true }])
                    }
                  >
                    Month
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    onClick={() =>
                      setSorting([{ id: "createdAt", desc: false }])
                    }
                  >
                    Year
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs> */

  return (
    <main className="grid  flex-1 items-start gap-4 p-4 sm:px-2 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-4"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 py-4">
          {route === "orders" ? (
            <>
              <Input
                placeholder={`Search with ${searchKey}...`}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </>
          ) : route !== "recent" ? (
            <Input
              placeholder={`Search with ${searchKey}...`}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          ) : null}{" "}
          {route !== "recent" ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <>
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        </>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              {route === "products" && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="ml-auto">
                      Sort By Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setSorting([{ id: "isArchived", desc: false }])
                      }
                      checked={
                        sorting.find((s) => s.id === "isArchived" && !s.desc)
                          ? true
                          : false
                      }
                      className="capitalize items-center justify-center flex flex-col  cursor-pointer p-2"
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setSorting([{ id: "isArchived", desc: true }])
                      }
                      checked={
                        sorting.find((s) => s.id === "isArchived" && s.desc)
                          ? true
                          : false
                      }
                      className="capitalize flex items-center justify-center flex-col cursor-pointer p-2"
                    >
                      Inactive
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {route === "orders" && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="ml-auto">
                      Sort By Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      onClick={() => setSorting([{ id: "isPaid", desc: true }])}
                      checked={
                        sorting.find((s) => s.id === "isPaid" && s.desc)
                          ? true
                          : false
                      }
                      className="capitalize items-center justify-center flex flex-col  cursor-pointer p-2"
                    >
                      Paid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setSorting([{ id: "isPaid", desc: false }])
                      }
                      checked={
                        sorting.find((s) => s.id === "isPaid" && !s.desc)
                          ? true
                          : false
                      }
                      className="capitalize flex items-center justify-center flex-col cursor-pointer p-2"
                    >
                      UnPaid
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button variant="outline" className="flex gap-1">
                <File className="h-3.5 w-3.5" />
                <CSVLink data={data as Data} filename="my_data.csv">
                  <span
                    onClick={() => {
                      toast.success("Exporting...");
                    }}
                    className="sr-only sm:not-sr-only sm:whitespace-nowrap"
                  >
                    Export
                  </span>
                </CSVLink>
              </Button>
              {route !== "orders" && (
                <>
                  <Link href={`/${params.storeId}/${route}/new`}>
                    <Button className="flex gap-x-1" variant={"outline"}>
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only capitalize sm:not-sr-only sm:whitespace-nowrap">
                        Add New {route}
                      </span>
                    </Button>
                  </Link>
                </>
              )}{" "}
            </>
          ) : null}
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle className="capitalize">{route}</CardTitle>
              <CardDescription>
                Manage your {route} and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-end justify-end gap-x-2">
              {route !== "recent" ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </>
              ) : null}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
