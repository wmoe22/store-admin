import {
  AreaChartIcon,
  BarChart2Icon,
  FileSearch,
  LineChartIcon,
} from "lucide-react";
import { useState } from "react";
import AreaVariant from "./AreaVariant";
import { BarVariant } from "./BarVariant";
import { LineVariant } from "./LineVariant";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  data?: {
    date: string;
    income: string;
    expenses: number;
  }[];
};

const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type: string) => {
    setChartType(type);
  };
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transitions</CardTitle>
        <Select onValueChange={onTypeChange} defaultValue={chartType}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
            <SelectContent>
              <SelectItem value="area">
                <div className="flex items-center">
                  <AreaChartIcon className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Area Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="line">
                <div className="flex items-center">
                  <LineChartIcon className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Line Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="bar">
                <div className="flex items-center">
                  <BarChart2Icon className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Bar Chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="text-muted-foreground size-6" />
            <p className="text-muted-foreground  text-sm">
              No Data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "line" && <LineVariant data={data} />}
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
