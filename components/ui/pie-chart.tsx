"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PercentageBadge from "../pecentageBadge";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export interface ProductData {
  name: string;
  count: number;
}

export interface ChartData {
  name: string;
  count: number;
  fill: string;
}

export const generateChartData = (data: ProductData[]): ChartData[] => {
  const colors = [
    "var(--color-chrome)",
    "var(--color-safari)",
    "var(--color-firefox)",
    "var(--color-edge)",
    "var(--color-other)",
  ];

  return data.map((item, index) => ({
    name: item.name,
    count: item.count,
    fill: colors[index % colors.length],
  }));
};

interface PieChartProps {
  data: any;
  desc: string;
  percentage: number;
}

export function PieChartComponent({ data, percentage, desc }: PieChartProps) {
  const chartData = generateChartData(data);
  console.log(chartData);

  return (
    <Card className="flex  flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Pie Chart - Label</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              <PercentageBadge percentageChange={percentage} />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
