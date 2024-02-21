import React from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type CardProps = {
  title: string;
  image?: string;
  onRedeem?: () => {};
};

export default function GiftCard(props: CardProps) {
  return (
    <Card className="lg:max-w-md w-full">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src="https://cdn.pixabay.com/photo/2023/03/16/16/49/watercolor-7857103_640.png"
          alt="Card Image"
          className="w-full"
        />
      </CardContent>
      <CardFooter>
        <Button variant="default">Redeem</Button>
      </CardFooter>
    </Card>
  );
}
