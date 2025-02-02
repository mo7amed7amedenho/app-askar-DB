"use client";
import { Progress } from "@heroui/react";

import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
} from "recharts";
import {
  Card,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";

type ChartData = {
  name: string;
  value: number;
  [key: string]: string | number;
};

type CircleChartProps = {
  title: string;
  color: ButtonProps["color"];
  chartData: ChartData[];
  total: number;
};

const data: CircleChartProps[] = [
  {
    title: "Engagement",
    color: "secondary",
    total: 4200,
    chartData: [
      {
        name: "Daily Views",
        value: 3150,
        fill: "hsl(var(--heroui-secondary))",
      },
    ],
  },
  {
    title: "Conversion",
    color: "success",
    total: 1000,
    chartData: [
      { name: "Sales", value: 750, fill: "hsl(var(--heroui-success))" },
    ],
  },
  {
    title: "Bounce Rate",
    color: "warning",
    total: 100,
    chartData: [
      { name: "Exits", value: 80, fill: "hsl(var(--heroui-warning))" },
    ],
  },
  {
    title: "Errors",
    color: "danger",
    total: 500,
    chartData: [
      { name: "Issues", value: 450, fill: "hsl(var(--heroui-danger))" },
    ],
  },
];

const assets = [
  { id: 1, name: "عهدة الطابعة", remaining: 80 },
  { id: 2, name: "عهدة الأوراق", remaining: 61 },
  { id: 3, name: "عهدة الأحبار", remaining: 25 },
  { id: 4, name: "عهدة الأقلام", remaining: 5 },
];

const getColor = (value: number) => {
  if (value > 80) return "danger";
  if (value > 50 && value < 80) return "warning";
  if (value < 50) return "success";
  return "danger";
};

export default function AssetProgressPage() {
  return (
    <main>
      <div className="flex items-center justify-center border-b dark:border-b-zinc-700">
        <h1 className="text-2xl text-center font-bold m-4">إدارة العهدات</h1>
      </div>

      <div className="p-6 pt-10 grid gap-y-6 grid-cols-2 max-sm:grid-cols-1">
        {/* قسم الدوائر البيانية */}
        <dl className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-2">
          {data.map((item, index) => (
            <CircleChartCard key={index} {...item} />
          ))}
        </dl>

        {/* قسم حالة العهدات */}
        <div className="w-full flex sm:px-8 flex-col">
          <h2 className="text-xl font-bold mb-4">حالة العهدات</h2>
          <div className="space-y-5">
            {assets.map((asset) => (
              <div key={asset.id} className="space-y-2">
                <p className="text-sm font-medium">{asset.name}</p>
                <Progress
                  value={asset.remaining}
                  color={getColor(asset.remaining)}
                  showValueLabel
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

const CircleChartCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, color, chartData, total, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "h-[240px] border border-transparent dark:border-default-100",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-y-2 p-4 pb-0">
        <div className="flex items-center justify-between gap-x-2">
          <dt>
            <h3 className="text-small font-medium text-default-500">{title}</h3>
          </dt>
          <div className="flex items-center justify-end gap-x-2">
            <Dropdown
              classNames={{
                content: "min-w-[120px]",
              }}
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon height={16} icon="solar:menu-dots-bold" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  title: "text-tiny",
                }}
                variant="flat"
              >
                <DropdownItem key="view-details">View Details</DropdownItem>
                <DropdownItem key="export-data">Export Data</DropdownItem>
                <DropdownItem key="set-alert">Set Alert</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex h-full gap-x-3">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <RadialBarChart
            barSize={10}
            cx="50%"
            cy="50%"
            data={chartData}
            endAngle={-270}
            innerRadius={90}
            outerRadius={70}
            startAngle={90}
          >
            <PolarAngleAxis
              angleAxisId={0}
              domain={[0, total]}
              tick={false}
              type="number"
            />
            <RadialBar
              angleAxisId={0}
              animationDuration={1000}
              animationEasing="ease"
              background={{
                fill: "hsl(var(--heroui-default-100))",
              }}
              cornerRadius={12}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--heroui-${color === "default" ? "foreground" : color}))`}
                />
              ))}
            </RadialBar>
            <g>
              <text textAnchor="middle" x="50%" y="48%">
                <tspan
                  className="fill-default-500 text-tiny"
                  dy="-0.5em"
                  x="50%"
                >
                  {chartData?.[0].name}
                </tspan>
                <tspan
                  className="fill-foreground text-medium font-semibold"
                  dy="1.5em"
                  x="50%"
                >
                  {formatTotal(total)}
                </tspan>
              </text>
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});

CircleChartCard.displayName = "CircleChartCard";
