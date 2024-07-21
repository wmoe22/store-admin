import { getGraphRevenue } from "@/actions/getGraphRevenue";
import getPopularItems from "@/actions/getPopularItem";
import { getTotalRevenueForPastPeriod } from "@/actions/getTotalRevenue";
import { AreaChartComponent } from "@/components/ui/area-chart";
import { BarChartComponent } from "@/components/ui/bar-chart";
import { LineChartComponent } from "@/components/ui/line-chart";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { RadarCharComponent } from "@/components/ui/radar-chart";
import { RadicalChartComponent } from "@/components/ui/radical-chart";
import db from "@/lib/db";
import { Product } from "@prisma/client";

const Analytics = async ({ params }: { params: { storeId: string } }) => {
  const revenue = await getGraphRevenue(params.storeId);
  const monthlyRevenue = await getTotalRevenueForPastPeriod(
    params.storeId,
    182
  );
  const popularItems = await getPopularItems(params.storeId, 365);
  const popularProductForPie = await db.product.findMany({
    where: {
      storeId: params.storeId,
      id: {
        in: popularItems.map((item) => item.productId),
      },
    },
    include: {
      images: true,
    },
  });
  // Create a mapping of productId to productName
  const productIdToName: { [key: string]: string } =
    popularProductForPie.reduce((acc, product: Product) => {
      acc[product.id] = product.name;
      return acc;
    }, {} as { [key: string]: string });

  // Map popularItems to include product names instead of product IDs
  const popularItemsWithNames = popularItems.map((item) => ({
    name: productIdToName[item.productId],
    count: item.count,
  }));

  /* TODO:to look for analytics chars examples */
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <div className=" grid grid-cols-2 flex-col sm:gap-4 sm:py-4 sm:pl-20 sm:pr-3">
        <AreaChartComponent
          data={revenue}
          desc={`Showing total visitors for the last 6 months
`}
          percentage={monthlyRevenue}
        />
        <BarChartComponent data={revenue} />
        <LineChartComponent data={revenue} />
        <RadarCharComponent data={revenue} />
        <RadicalChartComponent data={revenue} />
        <PieChartComponent
          desc=" Showing total sales count for the last 6 months"
          data={popularItemsWithNames}
          percentage={monthlyRevenue}
        />
      </div>
    </div>
  );
};

export default Analytics;
