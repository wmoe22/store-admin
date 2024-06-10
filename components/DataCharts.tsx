"use client";

import Chart from "./Chart";

const DataCharts = () => {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-6 gap-8">
      <div className="cols-span-1 lg:cols-span-3 xl:cols-span-4">
        <Chart data={[]} />
      </div>
    </div>
  );
};

export default DataCharts;
