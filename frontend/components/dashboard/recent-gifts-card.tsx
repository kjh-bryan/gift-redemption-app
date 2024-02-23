/* eslint-disable @next/next/no-img-element */
import React from "react";

export type GiftProps = {
  gift_name: string;
  created_at: string;
};

export default function RecentGiftCards(props: GiftProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src="images/gift_unredeemed.png"
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p>{props.gift_name}</p>
        </div>
      </section>
      <p>{new Date(props.created_at).toLocaleString()}</p>
    </div>
  );
}
