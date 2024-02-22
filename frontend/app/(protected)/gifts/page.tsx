"use client";

import { getAllGifts } from "@/app/api/gift";
import PageTitle from "@/components/dashboard/page-title";
import CreateGiftCard from "@/components/gifts/create-gift";
import GiftCard from "@/components/gifts/gift-card";
import { GiftProps } from "@/interfaces/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

export default function GiftPage({}: Props) {
  const [gifts, setGifts] = useState<GiftProps[]>([]);
  const session = useSession();
  useEffect(() => {
    (async () => {
      const giftData = await getAllGifts();
      console.log("giftData", giftData.data.data);
      if (giftData.status === 200) {
        setGifts(giftData.data.data);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Gifts" />
      {session.data && session.data.user.team_name !== "UNASSIGNED" ? (
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {session.data?.user?.team_name &&
            gifts.map((gift, index) => (
              <GiftCard
                key={index}
                gift_name={gift.gift_name}
                team_name={session.data.user.team_name}
              />
            ))}
          {session.data?.user && session.data.user.role_name === "ADMIN" && (
            <CreateGiftCard setGifts={setGifts} />
          )}
        </section>
      ) : (
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          <h1 className="text-lg">You are currently not assigned to a team</h1>
        </section>
      )}
    </div>
  );
}
