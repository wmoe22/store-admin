import { getTotalRevenueForPastPeriod } from "@/actions/getTotalRevenue";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import {
  ArrowRight,
  TreeDeciduous,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { OrderColumn } from "./Columns";
import OrderInfo from "./OrderInfo";

async function Orders({
  orders,
  storeId,
}: {
  orders: OrderColumn[];
  storeId: string;
}) {
  const weeklyRevenue = await getTotalRevenueForPastPeriod(storeId, 7);
  const monthlyRevenue = await getTotalRevenueForPastPeriod(storeId, 30);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="grid grid-cols-1 sm:gap-4 sm:py-4 sm:pl-14">
          <div className="p-7">
            <h1 className="font-bold text-4xl">Orders</h1>
            <p className="text-lg text-gray-500">Overview of store orders</p>
            <Separator className="mt-7" />
          </div>{" "}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 px-2 lg:grid-cols-2 xl:grid-cols-12">
                <Card className="sm:col-span-6" x-chunk="dashboard-05-chunk-0">
                  <CardHeader>
                    <CardTitle>Your Orders</CardTitle>
                  </CardHeader>
                  <CardFooter className="max-w-lg text-balance font-medium text-muted-foreground leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardFooter>
                </Card>

                <Card className="flex col-span-3 gap-y-4 flex-col">
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">
                      {formatter.format(Number(weeklyRevenue.currentRevenue))}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <div className="text-xs flex items-center  gap-x-2  text-muted-foreground">
                      {weeklyRevenue.percentageChange < 0 ? (
                        <Badge variant={"down"} className="flex w-fit gap-x-1">
                          <TrendingDown className="w-4 h-4" />
                          {weeklyRevenue.percentageChange}%
                        </Badge>
                      ) : weeklyRevenue.percentageChange > 0 ? (
                        <Badge variant="green" className="flex w-fit gap-x-1">
                          <TrendingUp className="w-4 h-4" />
                          {weeklyRevenue.percentageChange}%
                        </Badge>
                      ) : (
                        <Badge variant="low" className="flex w-fit gap-x-1">
                          <TreeDeciduous className="w-4 h-4" />
                          {weeklyRevenue.percentageChange}%
                        </Badge>
                      )}
                      from last week
                    </div>
                  </CardFooter>
                </Card>

                <Card className="flex gap-y-4 col-span-3 flex-col">
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">
                      {formatter.format(Number(monthlyRevenue.currentRevenue))}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <div className="text-xs flex items-center  gap-x-2  text-muted-foreground">
                      {monthlyRevenue.percentageChange < 0 ? (
                        <Badge variant={"down"} className="flex w-fit gap-x-1">
                          <TrendingDown className="w-4 h-4" />
                          {monthlyRevenue.percentageChange}%
                        </Badge>
                      ) : monthlyRevenue.percentageChange > 0 ? (
                        <Badge variant="green" className="flex w-fit gap-x-1">
                          <TrendingUp className="w-4 h-4" />
                          {monthlyRevenue.percentageChange}%
                        </Badge>
                      ) : (
                        <Badge variant="low" className="flex w-fit gap-x-1">
                          <ArrowRight className="w-4 h-4" />
                          {monthlyRevenue.percentageChange}%
                        </Badge>
                      )}
                      from last month
                    </div>
                  </CardFooter>
                </Card>
                {/*    <CalendarForm /> */}
              </div>
              <OrderInfo orders={orders} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Orders;
