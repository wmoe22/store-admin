"use client";

import { TreeDeciduous, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "./badge";

/* random fill for random items */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const chartData = [
  { browser: "chrome", count: 275, fill: "var(--color-chrome)" },
  { browser: "safari", count: 200, fill: "var(--color-safari)" },
  { browser: "firefox", count: 187, fill: "var(--color-firefox)" },
  { browser: "edge", count: 173, fill: "var(--color-edge)" },
  { browser: "other", count: 90, fill: "var(--color-other)" },
];

const color = [
  "var(--color-chrome)",
  "var(--color-safari)",
  "var(--color-firefox)",
  "var(--color-edge)",
  "var(--color-other)",
];

const randomColorIndex = Math.floor(Math.random() * color.length);

const randomColor = color[randomColorIndex];

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

interface ProductData {
  name: string;
  count: number;
}

interface ChartData {
  name: string;
  count: number;
  fill: string;
}

const generateChartData = (data: ProductData[]): ChartData[] => {
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
  percentage: {
    currentRevenue: any;
    previousRevenue: any;
    percentageChange: number;
  };
}

export function PieChartComponent({ data, percentage, desc }: PieChartProps) {
  const chartData = generateChartData(data);
  console.log(chartData);

  return (
    <Card className="flex  flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Pie Chart - Label</CardTitle>
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
      <CardFooter className="flex-col gap-2 text-sm">
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
        <div className="leading-none text-muted-foreground">{desc}</div>
      </CardFooter>
    </Card>
  );
}
