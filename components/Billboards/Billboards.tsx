import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import BillboardsInfo from "./BillboardsInfo";

const Billboards = ({ billboards }: { billboards: Billboard[] }) => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className="p-7">
            <h1 className="font-bold text-4xl">Billboards</h1>
            <p className="text-lg text-gray-500">
              Overview of store billboards
            </p>
            <Separator className="mt-7" />
          </div>
          <BillboardsInfo billboards={billboards} />
        </div>
      </div>
    </>
  );
};

export default Billboards;
