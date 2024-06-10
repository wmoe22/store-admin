import { format } from "date-fns";
import {
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

type Props = {
  data: {
    date: string;
    income: string;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
        <CartesianGrid stroke="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={"date"}
          tickMargin={16}
          style={{ fontSize: "12px" }}
          tickFormatter={(value) => format(value, "dd MMM")}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dot={false}
          dataKey={"income"}
          stroke="#3d82f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Bar
          dataKey={"expenses"}
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
