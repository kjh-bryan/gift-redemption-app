"use client";

import { getAllUsers } from "@/app/api/user";
import { User, columns } from "@/components/users/column";
import PageTitle from "@/components/dashboard/page-title";
import { DataTable } from "@/components/users/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

type Props = {};

export default function UsersPage({}: Props) {
  const [users, setUsers] = React.useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getAllUsers();
      const data = response.data.data;
      setUsers(data);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="User" />

      <DataTable columns={columns} data={users} setData={setUsers} />
    </div>
  );
}
