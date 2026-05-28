"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import ChartContainer from "@/components/ui/chart-container";

const data = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 24000 },
  { month: "Apr", sales: 22000 },
  { month: "May", sales: 30000 },
];

export default function SalesChart() {
  return (
    <div className="h-[340px] rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5 transition-all duration-200 hover:shadow-md">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Vendor Analytics
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Sales Performance
        </h2>
      </div>

      <ChartContainer className="h-[78%]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#999" }}
              axisLine={false}
              tickLine={false}
            />
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
              dataKey="sales"
              stroke="#0c831f"
              fill="#0c831f"
              fillOpacity={0.16}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
