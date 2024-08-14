"use client";

import { Billboard } from "@prisma/client";
import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { columns } from "./Columns";

const BillboardsInfo = ({ billboards }: { billboards: Billboard[] }) => {
  const formattedBillboards = billboards.map((billboard) => ({
    ...billboard,
    createdAt: billboard.createdAt.toDateString(),
  }));
  return (
    <main className="grid bg-transparent flex-1 items-start gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
      <RefineDataTable
        route="billboards"
        columns={columns}
        data={formattedBillboards}
        searchKey={"label"}
      />
      <Separator />
      <ApiList entityId="billboardId" entityName="billboards" />
    </main>
  );
};

export default BillboardsInfo;
