import { getTotalRevenueForPastPeriod } from "@/actions/getTotalRevenue";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import PercentageBadge from "../pecentageBadge";
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

  /* TODO:Sort By Status Filter with an icon */
  return (
    <>
      <div className="flex min-h-screen bg-transparent w-full flex-col ">
        <div className="grid grid-cols-1 sm:gap-4 sm:py-6 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-6">
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
                    <div className="flex w-full items-start gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                          <PercentageBadge
                            percentageChange={weeklyRevenue.percentageChange}
                          />
                        </div>
                      </div>
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
                    <div className="flex w-full items-start gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                          <PercentageBadge
                            percentageChange={monthlyRevenue.percentageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
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
