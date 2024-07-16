import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardCard = ({
  content,
  title,
  Icon,
  status,
}: {
  content: any;
  title: string;
  Icon: any;
  status?: any;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{status}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
