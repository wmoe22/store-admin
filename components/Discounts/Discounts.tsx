import { DiscountColumn } from "./Columns";
import DiscountInfo from "./DiscountInfo";

const Discounts = ({ discounts }: { discounts: DiscountColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
        <DiscountInfo discounts={discounts} />
      </div>
    </div>
  );
};

export default Discounts;
