import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { DiscountColumn, columns } from "./Columns";

const DiscountInfo = ({ discounts }: { discounts: DiscountColumn[] }) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RefineDataTable
        columns={columns}
        data={discounts}
        searchKey="name"
        route="discounts"
      />
      <Separator />
      <ApiList entityId="discountId" entityName="discounts" />
    </main>
  );
};

export default DiscountInfo;
