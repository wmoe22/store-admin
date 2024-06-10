import { Separator } from "../ui/separator";
import { CustomerColumn } from "./Columns";
import CustomerInfo from "./CustomerInfo";

const Customers = ({ customers }: { customers: CustomerColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col sm:bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Customers</h1>
          <p className="text-lg text-gray-500">Overview of store Customers</p>
          <Separator className="mt-7" />
        </div>
        <CustomerInfo customers={customers} />
      </div>
    </div>
  );
};

export default Customers;
