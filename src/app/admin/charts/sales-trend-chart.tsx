"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ChartContainer from "@/components/ui/chart-container";

const data = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 180 },
  { day: "Wed", sales: 150 },
  { day: "Thu", sales: 220 },
  { day: "Fri", sales: 280 },
  { day: "Sat", sales: 340 },
  { day: "Sun", sales: 290 },
];

export default function SalesTrendChart() {
  return (
    <ChartContainer className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#999" }} />
          <YAxis tick={{ fontSize: 11, fill: "#999" }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="sales" fill="#0c831f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}