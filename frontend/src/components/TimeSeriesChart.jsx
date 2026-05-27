import {
    PieChart,
    Pie,
    Tooltip
  } from "recharts";
  
  export default function PieChartView({ data }) {
  
    const inQty = data
      .filter(x => x.movementType === "IN")
      .reduce((a, b) => a + b.quantity, 0);
  
    const outQty = data
      .filter(x => x.movementType === "OUT")
      .reduce((a, b) => a + b.quantity, 0);
  
    const chartData = [
      { name: "IN", value: inQty },
      { name: "OUT", value: outQty }
    ];
  
    return (
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={100}
        />
        <Tooltip />
      </PieChart>
    );
  }