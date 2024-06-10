import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { SizeColumn, columns } from "./Columns";

const SizesInfo = ({ sizes }: { sizes: SizeColumn[] }) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RefineDataTable
        columns={columns}
        data={sizes}
        searchKey="name"
        route={"sizes"}
      />
      <Separator />
      <ApiList entityName={"sizes"} entityId={"sizeId"} />
    </main>
  );
};

export default SizesInfo;
