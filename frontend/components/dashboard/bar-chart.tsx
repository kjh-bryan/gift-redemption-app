/** @format */
"use client";
import { getAllUserTeams } from "@/app/api/user-team";
import React, { use, useEffect, useState } from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type Props = {
  data?: any[];
  monthsTotal?: any[];
};

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function BarChart({}: Props) {
  const [barData, setBarData] = useState<
    {
      name: string;
      total: number;
    }[]
  >();

  useEffect(() => {
    (async () => {
      const responseUserTeam = await getAllUserTeams();
      const dataUserTeam = responseUserTeam.data.data;

      const monthsTotal = Array(12).fill(0);

      dataUserTeam.forEach((userTeam: any) => {
        const monthIndex = new Date(userTeam.created_at).getMonth(); // Get the month index (0-11) from the 'created_at' date
        monthsTotal[monthIndex] += 1; // Increment the total for the corresponding month
      });
      const updatedData = data.map((monthData, index) => {
        return {
          name: monthData,
          total: monthsTotal[index],
        };
      });
      console.log("monthsTotal", monthsTotal);
      console.log("updatedData", updatedData);
      setBarData(updatedData as any);
    })();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={barData}>
        <XAxis
          dataKey={"name.name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value: any) => `${value}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
