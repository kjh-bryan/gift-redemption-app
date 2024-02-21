import PageTitle from "@/components/dashboard/page-title";
import GiftCard from "@/components/gifts/gift-card";
import React from "react";

type Props = {};

export default function GiftPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Gifts" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <GiftCard title="Amazon Gift Card" />
        <GiftCard title="Amazon Gift Card" />
      </section>
    </div>
  );
}
