import { RefineDataTable } from "../RefineDataTable";
import ApiList from "../ui/api-list";
import { Separator } from "../ui/separator";
import { BrandColumn, columns } from "./Columns";

const BrandInfo = ({ brands }: { brands: BrandColumn[] }) => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RefineDataTable
        columns={columns}
        data={brands}
        searchKey="name"
        route={"brands"}
      />
      <Separator />
      <ApiList entityName={"brands"} entityId={"brandId"} />
    </main>
  );
};

export default BrandInfo;
