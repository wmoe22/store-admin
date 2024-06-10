import { Separator } from "../ui/separator";
import { DiscountColumn } from "./Columns";
import DiscountInfo from "./DiscountInfo";

const Discounts = ({ discounts }: { discounts: DiscountColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col sm:bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Discounts</h1>
          <p className="text-lg text-gray-500">Overview of store discounts</p>
          <Separator className="mt-7" />
        </div>
        <DiscountInfo discounts={discounts} />
      </div>
    </div>
  );
};

export default Discounts;
