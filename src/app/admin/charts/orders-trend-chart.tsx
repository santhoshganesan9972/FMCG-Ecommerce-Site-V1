"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import ChartContainer from "@/components/ui/chart-container";

const data = [
  { hour: "00", orders: 12 },
  { hour: "04", orders: 8 },
  { hour: "08", orders: 24 },
  { hour: "12", orders: 42 },
  { hour: "16", orders: 58 },
  { hour: "20", orders: 72 },
  { hour: "24", orders: 48 },
];

export default function OrdersTrendChart() {
  return (
    <ChartContainer className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4f8b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff4f8b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#999" }} />
          <YAxis tick={{ fontSize: 11, fill: "#999" }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#ff4f8b"
            fillOpacity={1}
            fill="url(#ordersGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}