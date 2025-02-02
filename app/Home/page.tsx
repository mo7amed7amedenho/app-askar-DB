"use client";

import type { ButtonProps, CardProps } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";
import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
} from "recharts";
import { Card, cn } from "@heroui/react";

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
export const users = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "Emily Collins",
    role: "Marketing Manager",
    status: "Active",
  },
  {
    key: "6",
    name: "Brian Kim",
    role: "Product Manager",
    status: "Active",
  },
  {
    key: "7",
    name: "Laura Thompson",
    role: "UX Designer",
    status: "Active",
  },
  {
    key: "8",
    name: "Michael Stevens",
    role: "Data Analyst",
    status: "Paused",
  },
  {
    key: "9",
    name: "Sophia Nguyen",
    role: "Quality Assurance",
    status: "Active",
  },
  {
    key: "10",
    name: "James Wilson",
    role: "Front-end Developer",
    status: "Vacation",
  },
  {
    key: "11",
    name: "Ava Johnson",
    role: "Back-end Developer",
    status: "Active",
  },
  {
    key: "12",
    name: "Isabella Smith",
    role: "Graphic Designer",
    status: "Active",
  },
  {
    key: "13",
    name: "Oliver Brown",
    role: "Content Writer",
    status: "Paused",
  },
  {
    key: "14",
    name: "Lucas Jones",
    role: "Project Manager",
    status: "Active",
  },
  {
    key: "15",
    name: "Grace Davis",
    role: "HR Manager",
    status: "Active",
  },
  {
    key: "16",
    name: "Elijah Garcia",
    role: "Network Administrator",
    status: "Active",
  },
  {
    key: "17",
    name: "Emma Martinez",
    role: "Accountant",
    status: "Vacation",
  },
  {
    key: "18",
    name: "Benjamin Lee",
    role: "Operations Manager",
    status: "Active",
  },
  {
    key: "19",
    name: "Mia Hernandez",
    role: "Sales Manager",
    status: "Paused",
  },
  {
    key: "20",
    name: "Daniel Lewis",
    role: "DevOps Engineer",
    status: "Active",
  },
];
const data: CircleChartProps[] = [
  {
    title: "Activity",
    color: "default",
    total: 1358,
    chartData: [
      { name: "Active Users", value: 780, fill: "hsl(var(--heroui-primary))" },
    ],
  },
  {
    title: "Revenue",
    color: "primary",
    total: 2450,
    chartData: [
      { name: "Monthly", value: 1840, fill: "hsl(var(--heroui-primary))" },
    ],
  },
];

export default function Component() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-1">
      <dl className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        {data.map((item, index) => (
          <CircleChartCard key={index} {...item} />
        ))}
      </dl>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        color="secondary"
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">ROLE</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
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
    <div>
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
              <h3 className="text-small font-medium text-default-500">
                {title}
              </h3>
            </dt>
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
    </div>
  );
});

CircleChartCard.displayName = "CircleChartCard";
