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
import { TeamProps } from "@/interfaces/types";
import { Input } from "../ui/input";
import { createTeam, updateTeam } from "@/app/api/team";

export type User = {
  username: string;
  role_name: string;
  team_name: string;
  created_at: string;
};

export const handleUpdateTeamName = async (
  team_name: string,
  new_team_name: string,
  updateData: any,
  id: any,
  index: number,
  setUpdateTeamModalOpen: any,
) => {
  const updateTeamResponse = await updateTeam(team_name, new_team_name);
  if (updateTeamResponse.status === 200) {
    setUpdateTeamModalOpen(false);
    updateData(index, id, new_team_name);
    toast.success("Updated Team successfully");
  }
};

export const columns: ColumnDef<TeamProps>[] = [
  {
    accessorKey: "team_name",
    header: "Team",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "team_name",
            )}`}
            alt="team_name-image"
          />
          <p>{row.getValue("team_name")} </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const teamRow = row.original;
      const [updateTeamModalOpen, setUpdateTeamModalOpen] = useState(false);
      const [updateTeam, setUpdateTeam] = useState<string>(teamRow.team_name);
      const [error, setError] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      return (
        <>
          <Dialog
            open={updateTeamModalOpen}
            onOpenChange={setUpdateTeamModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Changing Team Name of</DialogTitle>
                <DialogDescription>{teamRow.team_name}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Team
                  </Label>
                  <Input
                    id="name"
                    value={updateTeam}
                    onChange={(values) => setUpdateTeam(values.target.value)}
                    className="col-span-3"
                  />
                  {error && (
                    <p className="col-start-2 text-sm text-red-400 col-span-2">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={teamRow.team_name === updateTeam}
                  onClick={() => {
                    handleUpdateTeamName(
                      teamRow.team_name,
                      updateTeam,
                      (table.options.meta as any).updateData,
                      "team_name",
                      row.index,
                      setUpdateTeamModalOpen,
                    );
                  }}
                  type="submit"
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
                onClick={() => navigator.clipboard.writeText(teamRow.team_name)}
              >
                Copy Team Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUpdateTeamModalOpen(!updateTeamModalOpen);
                }}
              >
                Update Team Name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
