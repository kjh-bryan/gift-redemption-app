"use client";

import { getAllTeams } from "@/app/api/team";
import PageTitle from "@/components/dashboard/page-title";
import { columns } from "@/components/teams/column";
import { DataTable } from "@/components/teams/data-table";
import { TeamProps } from "@/interfaces/types";
import React, { useEffect, useState } from "react";

type Props = {};

export default function TeamsPage({}: Props) {
  const [teams, setTeams] = useState<TeamProps[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getAllTeams();
      const data = response.data.data;
      setTeams(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Teams" />

      <DataTable columns={columns} data={teams} setData={setTeams} />
    </div>
  );
}
