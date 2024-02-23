"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { TeamSelect } from "./team-select";
import { deleteUser } from "@/app/api/user";
import { changeTeam } from "@/app/api/user-team";
import { toast } from "sonner";

export type User = {
  username: string;
  role_name: string;
  team_name: string;
  created_at: string;
};

export const handleChangeTeam = async (
  username: string,
  team_name: string,
  updateData: any,
  id: any,
  index: number,
  setChangeTeamModalOpen: any,
) => {
  const changeTeamResponse = await changeTeam(username, team_name);
  if (changeTeamResponse.status === 200) {
    setChangeTeamModalOpen(false);
    updateData(index, id, team_name);
    toast.success("User changed team successfully");
  }
};

export const handleDeleteUser = async (
  username: string,
  team_name: string,
  removeRow: any,
  index: number,
  setDeleteUserModalOpen: any,
) => {
  const deleteUserResponse = await deleteUser(username);
  if (deleteUserResponse.status === 200) {
    removeRow(index);
    setDeleteUserModalOpen(false);
    toast.success("User deleted successfully");
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Staff Pass ID",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "username",
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("username")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "role_name",
    header: "Role",
  },
  {
    accessorKey: "team_name",
    header: "Team",
  },
  {
    accessorKey: "created_at",
    header: "Mapping Date",
    cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleString(),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original;
      const [changeTeamModalOpen, setChangeTeamModalOpen] = useState(false);
      const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
      const [team, setTeam] = useState<string>(user.team_name);
      return (
        <>
          <Dialog
            open={changeTeamModalOpen}
            onOpenChange={setChangeTeamModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Changing Team for</DialogTitle>
                <DialogDescription>{user.username}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Team
                  </Label>
                  <TeamSelect
                    original={user.team_name}
                    value={team}
                    onChange={setTeam}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={user.team_name === team}
                  onClick={() => {
                    handleChangeTeam(
                      user.username,
                      team,
                      (table.options.meta as any).updateData,
                      "team_name",
                      row.index,
                      setChangeTeamModalOpen,
                    );
                  }}
                  type="submit"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog
            open={deleteUserModalOpen}
            onOpenChange={setDeleteUserModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  staff and remove the data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => {
                    handleDeleteUser(
                      user.username,
                      team,
                      (table.options.meta as any).removeRow,
                      row.index,
                      setDeleteUserModalOpen,
                    );
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.username)}
              >
                Copy Staff Pass ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setChangeTeamModalOpen(!changeTeamModalOpen);
                }}
              >
                Change Team
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setDeleteUserModalOpen(!deleteUserModalOpen);
                }}
                className="text-red-500"
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
