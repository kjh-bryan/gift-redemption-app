"use client";
import { getAllGifts } from "@/app/api/gift";
import { getAllRedemptions } from "@/app/api/redemption";
import { getAllRoles } from "@/app/api/role";
import { getAllTeams } from "@/app/api/team";
import { getAllUsers } from "@/app/api/user";
import { getAllUserTeams } from "@/app/api/user-team";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import BarChart from "@/components/dashboard/bar-chart";
import Card, { CardContent, CardProps } from "@/components/dashboard/card";
import PageTitle from "@/components/dashboard/page-title";
import RecentGiftCards from "@/components/dashboard/recent-gifts-card";
import SideNavbar from "@/components/dashboard/side-nav-bar";
import { User } from "@/components/users/column";
import { GiftProps, RoleProps, TeamProps } from "@/interfaces/types";
import {
  Activity,
  BadgeCheck,
  CreditCard,
  DollarSign,
  Gift,
  SquareUser,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [teams, setTeams] = React.useState<TeamProps[]>([]);
  const [gift, setGifts] = React.useState<GiftProps[]>([]);
  const [redeemed, setRedeemed] = React.useState<GiftProps[]>([]);
  const [role, setRoles] = React.useState<RoleProps[]>([]);
  const [newGifts, setNewGifts] = React.useState<GiftProps[]>([]);

  const [userTeams, setUserTeams] = React.useState([]);
  const [barData, setBarData] = React.useState([]);
  const [monthTotals, setMonthTotals] = React.useState<Array<number>>([]);
  useEffect(() => {
    (async () => {
      const response = await getAllUsers();
      const data = response.data.data;
      setUsers(data);

      const responseTeam = await getAllTeams();
      const dataTeam = responseTeam.data.data;
      setTeams(dataTeam);

      const responseGift = await getAllGifts();
      const dataGift = responseGift.data.data;
      setGifts(dataGift);

      const responseRedemption = await getAllRedemptions();
      const dataRedemption = responseRedemption.data.data;
      setRedeemed(dataRedemption);

      const responseRole = await getAllRoles();
      const dataRole = responseRole.data.data;
      setRoles(dataRole);

      const responseUserTeam = await getAllUserTeams();
      const dataUserTeam = responseUserTeam.data.data;
      setUserTeams(dataUserTeam);

      const NewMonthTotals = Array(12).fill(0);

      dataUserTeam.forEach((userTeam: any) => {
        const monthIndex = new Date(userTeam.created_at).getMonth(); // Get the month index (0-11) from the 'created_at' date
        NewMonthTotals[monthIndex] += 1; // Increment the total for the corresponding month
      });

      setBarData(userTeams);
      setMonthTotals(NewMonthTotals);
      const currentDate = new Date().getTime();

      const recentGifts = dataGift.filter((gift: GiftProps) => {
        const createdAtDate = new Date(gift.created_at).getTime();
        const timeDifference = currentDate - createdAtDate;

        const hoursDifference = timeDifference / (1000 * 3600);

        return hoursDifference < 24;
      });
      setNewGifts(recentGifts);
    })();
  }, []);
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <Card
          amount={users.length.toString()}
          discription={"+201 since last month"}
          icon={Users}
          label={"Total Staff"}
        />
        <Card
          amount={teams.length.toString()}
          discription={"+3 since last year"}
          icon={SquareUser}
          label={"Teams"}
        />
        <Card
          amount={gift.length.toString()}
          discription={`+${redeemed.length} total redeemed`}
          icon={Gift}
          label={"Gifts"}
        />
        <Card
          amount={role.length.toString()}
          discription={"+3 since last year"}
          icon={BadgeCheck}
          label={"Roles"}
        />
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview of Team Mapping Period</p>

          <BarChart data={barData} monthsTotal={monthTotals} />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Gifts</p>
            <p className="text-sm text-gray-400">
              There is {gift.length.toString()} gifts that have been made so
              far.
            </p>
          </section>
          {newGifts.map((d, i) => (
            <RecentGiftCards
              key={i}
              gift_name={d.gift_name}
              created_at={d.created_at.toString()}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
};

export default DashboardPage;
