import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamProps } from "@/interfaces/types";
import { getAllTeams } from "@/app/api/team";

type TeamSelectProps = {
  value: string;
  original: string;
  onChange: (value: string) => void;
};

export const TeamSelect = (props: TeamSelectProps) => {
  const [teamOptions, setTeamOptions] = useState<TeamProps[]>([]);
  useEffect(() => {
    (async () => {
      const teamData = await getAllTeams();
      if (teamData.status === 200) {
        setTeamOptions(teamData.data.data);
      }
    })();
  }, []);
  return (
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <SelectTrigger className="col-span-2">
        <SelectValue placeholder="Select a team" />
      </SelectTrigger>
      <SelectContent>
        {teamOptions &&
          teamOptions.map((option) => (
            <SelectItem
              disabled={props.original === option.team_name}
              className={`${
                props.original === option.team_name ? "bg-gray-200" : ""
              }`}
              key={option.team_name}
              value={option.team_name}
            >
              {option.team_name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
