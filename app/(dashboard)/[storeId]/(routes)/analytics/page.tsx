import DataCharts from "@/components/DataCharts";
import { Separator } from "@/components/ui/separator";
const Analytics = () => {
  return (
    <div>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Overview</h1>
          <p className="text-lg text-gray-500">Overview of store sales</p>
          <Separator className="mt-7" />
          <DataCharts />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
