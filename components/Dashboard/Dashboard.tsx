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
import { Product } from "@prisma/client";
import { format } from "date-fns";
import DashboardCard from "../DashboardCard";
import { RefineDataTable } from "../RefineDataTable";
import { AreaChartComponent } from "../ui/area-chart";
import { PieChartComponent } from "../ui/pie-chart";
import { columns, OrderColumn } from "./Columns";

export default async function Dashboard({ storeId }: { storeId: string }) {
  try {
    const totalRevenue = await getTotalRevenue(storeId);
    const graphRevenue = await getGraphRevenue(storeId);
    const salesCount = await getSalesCount(storeId);
    const stockCount = await getStockCount(storeId);
    const popularItems = await getPopularItems(storeId, 30);
    const pastStock = await getStockCountForPastPeriod(storeId);
    const pastSales = await getSalesCountForPastPeriod(storeId);
    const monthlyRevenue = await getTotalRevenueForPastPeriod(storeId, 30);
    const recentOrders = await getRecentOrders(storeId);

    if (!recentOrders || !popularItems) {
      console.error("Failed to fetch data");
      return;
    }

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

    const popularProduct =
      popularItems.length > 0
        ? await db.product.findMany({
            where: {
              storeId,
              id: popularItems[0].productId,
            },
            include: {
              images: true,
            },
          })
        : [];
    const popularProductForPie =
      popularItems.length > 0
        ? await db.product.findMany({
            where: {
              storeId,
              id: {
                in: popularItems.map((item) => item.productId),
              },
            },
            include: {
              images: true,
            },
          })
        : [];

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

    return (
      <div className="flex min-h-screen pl-0 md:pl-14 lg:pl-14 xl:pl-[4.2rem] w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-4">
          <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-4">
            <DashboardCard
              content={formatter.format(Number(totalRevenue))}
              Icon={DollarSign}
              title="Total Revenue"
              status={`${formatter.format(
                Number(monthlyRevenue.currentRevenue)
              )} revenue for last 30days period`}
            />

            <DashboardCard
              content={salesCount}
              Icon={CreditCard}
              title="Sales"
              status={`+${pastSales} sales for last 30days period`}
            />
            <DashboardCard
              content={
                popularProduct.length > 0
                  ? popularProduct[0].name
                  : "No popular products yet"
              }
              Icon={TrendingUp}
              title="Popular Product Last 30 days"
              status={`Total sales of - ${
                popularItems.length > 0 ? popularItems[0].count : 0
              }`}
            />
            <DashboardCard
              content={stockCount}
              Icon={Database}
              title="Stocks"
              status={` +${pastStock} Stocks for last 30days period`}
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2 " x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex  flex-row items-center">
                <div className="grid  gap-2">
                  <CardTitle>Resent Sales</CardTitle>
                  <CardDescription>
                    Recent sales from your store.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href={`${storeId}/orders`}>
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="flex  flex-col gap-4">
                <RefineDataTable
                  columns={columns}
                  data={formattedOrders}
                  searchKey={"id"}
                  route={"recent"}
                />
              </CardContent>
            </Card>
            <div className="grid gap-4 ">
              <PieChartComponent
                percentage={monthlyRevenue}
                data={popularItemsWithNames || null}
                desc={"Showing total sales count for the last month"}
              />
              <AreaChartComponent
                desc={`Showing total visitors for the last month`}
                percentage={monthlyRevenue}
                data={graphRevenue}
              />
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data for dashboard:", error);
    return <div>Error loading dashboard data. Please try again later.</div>;
  }
}
