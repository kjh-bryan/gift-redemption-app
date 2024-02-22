import React, { useEffect, useState } from "react";
import { DotLoaderOverlay } from "react-spinner-overlay";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redeemGift, verifyRedemption } from "@/app/api/redemption";
import { toast } from "sonner";

export type CardProps = {
  gift_name: string;
  team_name: string;
  image?: string;
};

export default function GiftCard(props: CardProps) {
  const [canRedeem, setCanRedeem] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const canRedeemResponse = await verifyRedemption({
        gift_name: props.gift_name,
        team_name: props.team_name || "",
      });
      setCanRedeem(canRedeemResponse.data.canRedeem);
      if (canRedeem !== null) {
        setIsLoading(false);
      }
    })();
  }, [canRedeem]);

  const handleRedeemGift = async () => {
    const redeemGiftResponse = await redeemGift({
      gift_name: props.gift_name,
      team_name: props.team_name,
    });
    if (redeemGiftResponse.status === 200) {
      setCanRedeem(false);
      toast("Gift has been redeemed.");
    }
  };
  return (
    <>
      {isLoading ? (
        <DotLoaderOverlay color="#000" loading={isLoading} />
      ) : (
        <Card className="lg:max-w-md w-full">
          <CardHeader>
            <CardTitle>{props.gift_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={
                canRedeem
                  ? "/images/gift_unredeemed.png"
                  : "/images/gift_redeemed.png"
              }
              alt="Card Image"
              className="w-full"
              width={300}
              height={300}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={!canRedeem}
              onClick={handleRedeemGift}
              variant="default"
            >
              Redeem
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
