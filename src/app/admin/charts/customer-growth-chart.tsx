"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ChartContainer from "@/components/ui/chart-container";

const data = [
  { month: "Jan", customers: 2800 },
  { month: "Feb", customers: 3200 },
  { month: "Mar", customers: 3800 },
  { month: "Apr", customers: 4100 },
  { month: "May", customers: 4800 },
  { month: "Jun", customers: 5200 },
];

export default function CustomerGrowthChart() {
  return (
    <ChartContainer className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#999" }} />
          <YAxis tick={{ fontSize: 11, fill: "#999" }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value) => [`${value}`, "Customers"]}
          />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}