import { RefineDataTable } from "../RefineDataTable";
import { CustomerColumn, columns } from "./Columns";

const CustomerInfo = ({ customers }: { customers: CustomerColumn[] }) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RefineDataTable
        columns={columns}
        data={customers}
        searchKey={"name"}
        route={"customers"}
      />
    </main>
  );
};

export default CustomerInfo;
