"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";
interface AchievementProgressChartProps {
  points?: number;
  progress?: number;
}

const chartConfig = {
  progress: {
    label: "Progress",
  },
} satisfies ChartConfig;

export const AchievementProgressChart = ({
  progress = 90,
}: AchievementProgressChartProps) => {
  const maxPoints = 100;
  const progressPercentage = Math.min(progress / maxPoints, 1);
  const endAngle = 90 + 360 * progressPercentage + 0.1;

  const chartData = [{ progress: progress, fill: "var(--color-primary)" }];

  return (
    <ChartContainer config={chartConfig} className="w-[80px] h-[80px]  ">
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={endAngle}
        innerRadius={40}
        outerRadius={32}
      >
        <RadialBar dataKey="progress" background cornerRadius={100} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-yellow-500 text-xl font-bold"
                    >
                      {progress}%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
