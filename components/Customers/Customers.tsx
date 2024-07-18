import { CustomerColumn } from "./Columns";
import CustomerInfo from "./CustomerInfo";

const Customers = ({ customers }: { customers: CustomerColumn[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-16">
        <CustomerInfo customers={customers} />
      </div>
    </div>
  );
};

export default Customers;
