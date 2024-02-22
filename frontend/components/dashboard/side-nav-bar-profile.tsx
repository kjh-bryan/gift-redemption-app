/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Badge } from "../ui/badge";

export type SideNarProfileProps = {
  staff_pass_id: string;
  role_name: string;
  team_name: string;
  isCollapsed: boolean;
};

export default function SideNavProfile(props: SideNarProfileProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 px-4 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${props.staff_pass_id}`}
            alt="avatar"
          />
        </div>
        {!props.isCollapsed && (
          <div className="text-sm">
            <p>{props.staff_pass_id.slice(0, 16) + ".."}</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400 flex">
              <p>{props.role_name}</p>
              <Badge className="m">{props.team_name}</Badge>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
