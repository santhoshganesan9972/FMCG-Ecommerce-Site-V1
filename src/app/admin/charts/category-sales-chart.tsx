"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartContainer from "@/components/ui/chart-container";

const data = [
  { name: "Groceries", value: 35 },
  { name: "Fruits", value: 20 },
  { name: "Snacks", value: 15 },
  { name: "Beverages", value: 12 },
  { name: "Dairy", value: 10 },
  { name: "Others", value: 8 },
];

const COLORS = ["#0c831f", "#10b981", "#ff4f8b", "#6366f1", "#f59e0b", "#8b5cf6"];

export default function CategorySalesChart() {
  return (
    <ChartContainer className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => <span className="text-xs text-[#666]">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}