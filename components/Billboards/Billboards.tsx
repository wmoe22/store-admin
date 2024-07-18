"use client";

import { Billboard } from "@prisma/client";
import BillboardsInfo from "./BillboardsInfo";

const Billboards = ({ billboards }: { billboards: Billboard[] }) => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-transparent">
        <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
          <BillboardsInfo billboards={billboards} />
        </div>
      </div>
    </>
  );
};

export default Billboards;
