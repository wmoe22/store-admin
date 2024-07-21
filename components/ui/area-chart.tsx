"use client";

import { TreeDeciduous, TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "./badge";
const chartData = [
  { month: "January", total: 186 },
  { month: "February", total: 305 },
  { month: "March", total: 237 },
  { month: "April", total: 73 },
  { month: "May", total: 209 },
  { month: "June", total: 214 },
  { month: "July", total: 214 },
  { month: "August", total: 214 },
  { month: "September", total: 214 },
  { month: "October", total: 214 },
  { month: "November", total: 214 },
  { month: "December", total: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaChartComponent({
  data,
  percentage,
  desc,
}: {
  data: any;
  percentage: {
    currentRevenue: any;
    previousRevenue: any;
    percentageChange: number;
  };
  desc: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {percentage.percentageChange < 0 ? (
                <Badge variant={"down"} className="flex w-fit gap-x-1">
                  Trending down by
                  <TrendingDown className="w-4 h-4" />
                  {percentage.percentageChange}%
                </Badge>
              ) : percentage.percentageChange > 0 ? (
                <Badge variant="green" className="flex w-fit gap-x-1">
                  Trending up by
                  <TrendingUp className="w-4 h-4" />
                  {percentage.percentageChange}%
                </Badge>
              ) : (
                <>
                  Trending stable by
                  <Badge variant="low" className="flex w-fit gap-x-1">
                    <TreeDeciduous className="w-4 h-4" />
                    {percentage.percentageChange}%
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
