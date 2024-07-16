import {
  ArrowUpRight,
  CreditCard,
  Database,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { getGraphRevenue } from "@/actions/getGraphRevenue";
import getPopularItems from "@/actions/getPopularItem";
import getRecentOrders from "@/actions/getRecentOrders";
import getSalesCount, {
  getSalesCountForPastPeriod,
} from "@/actions/getSalesCount";
import getStockCount, {
  getStockCountForPastPeriod,
} from "@/actions/getStockCount";
import getTotalRevenue, {
  getTotalRevenueForPastPeriod,
} from "@/actions/getTotalRevenue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import DashboardCard from "../DashboardCard";
import { RefineDataTable } from "../RefineDataTable";
import { AreaChartComponent } from "../ui/area-chart";
import { BarChartComponent } from "../ui/bar-chart";
import { Separator } from "../ui/separator";
import { columns, OrderColumn } from "./Columns";

export default async function Dashboard({ storeId }: { storeId: string }) {
  const totalRevenue = await getTotalRevenue(storeId);
  const graphRevenue = await getGraphRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const popularItems = await getPopularItems(storeId);
  const pastStock = await getStockCountForPastPeriod(storeId);
  const pastSales = await getSalesCountForPastPeriod(storeId);
  const pastRevenue = await getTotalRevenueForPastPeriod(storeId, 30);
  const recentOrders = await getRecentOrders(storeId);

  const formattedOrders: OrderColumn[] = recentOrders.map((item) => ({
    id: item.id,
    address: item.address,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    amount: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    phone: item.phone,
    isPaid: item.isPaid,
  }));
  console.log(popularItems[0], "popularItems");

  const popularProduct = await db.product.findMany({
    where: {
      storeId,

      id: popularItems[0].productId,
    },
    include: {
      images: true,
    },
  });

  console.log(popularProduct[0], "popularProduct");

  return (
    <div className="flex min-h-screen pl-0 md:pl-14 lg:pl-14 xl:pl-14 w-full flex-col">
      <div className="p-7">
        <h1 className="font-bold text-4xl">Dashboard</h1>
        <p className="text-lg text-gray-500">Overview of your store</p>
        <Separator className="mt-7" />
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardCard
            content={formatter.format(Number(totalRevenue))}
            Icon={DollarSign}
            title="Total Revenue"
            status={`${formatter.format(
              Number(pastRevenue.currentRevenue)
            )} revenue for last 30days period`}
          />

          <DashboardCard
            content={salesCount}
            Icon={CreditCard}
            title="Sales"
            status={`+${pastSales} sales for last 30days period`}
          />
          <DashboardCard
            content={popularProduct[0].name}
            Icon={TrendingUp}
            title="Popular Product Last 30 days"
            status={`Total sales of - ${popularItems[0].count}`}
          />
          <DashboardCard
            content={stockCount}
            Icon={Database}
            title="Stocks"
            status={` +${pastStock} Stocks for last 30days period`}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Resent Sales</CardTitle>
                <CardDescription>Recent sales from your store.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href={`${storeId}/orders`}>
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <RefineDataTable
                columns={columns}
                data={formattedOrders}
                searchKey={"id"}
                route={"recent"}
              />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <BarChartComponent data={graphRevenue} />
            <AreaChartComponent data={graphRevenue} />
          </div>
        </div>
      </main>
    </div>
  );
}
