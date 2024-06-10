import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
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

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
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
        <Bar dataKey={"income"} fill="#3d82f6" className="drop-shadow-sm" />
        <Bar dataKey={"expenses"} fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
