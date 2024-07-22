import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";

interface PercentageProps {
  percentageChange: number;
}

const PercentageBadge: React.FC<PercentageProps> = ({ percentageChange }) => {
  if (percentageChange < 0) {
    return (
      <Badge variant="down" className="flex w-fit gap-x-1">
        Trending down by
        <TrendingDown className="w-4 h-4" />
        {percentageChange}%
      </Badge>
    );
  } else if (percentageChange > 0) {
    return (
      <Badge variant="green" className="flex w-fit gap-x-1">
        Trending up by
        <TrendingUp className="w-4 h-4" />
        {percentageChange}%
      </Badge>
    );
  } else {
    return (
      <>
        Trending stable by
        <Badge variant="low" className="flex w-fit gap-x-1">
          <ArrowRight className="w-4 h-4" />
          {percentageChange}%
        </Badge>
      </>
    );
  }
};

export default PercentageBadge;
