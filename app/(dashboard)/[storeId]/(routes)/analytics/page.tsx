import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { AreaChartComponent } from "@/components/ui/area-chart";
import { BarChartComponent } from "@/components/ui/bar-chart";
import { LineChartComponent } from "@/components/ui/line-chart";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { RadarCharComponent } from "@/components/ui/radar-chart";
import { RadicalChartComponent } from "@/components/ui/radical-chart";
import { Separator } from "@/components/ui/separator";

const Analytics = async ({ storeId }: { storeId: string }) => {
  const revenue = await getGraphRevenue(storeId);
  console.log(revenue, "revenue");

  /* TODO:to look for analytics chars examples */
  return (
    <div>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="p-7">
          <h1 className="font-bold text-4xl">Overview</h1>
          <p className="text-lg text-gray-500">Overview of store sales</p>
          <Separator className="mt-7" />
          <section className="grid py-4 grid-cols-2 gap-4">
            <AreaChartComponent data={revenue} />
            <BarChartComponent data={revenue} />
            <LineChartComponent data={revenue} />
            <RadarCharComponent data={revenue} />
            <RadicalChartComponent data={revenue} />
            <PieChartComponent data={revenue} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
