import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiftProps } from "@/interfaces/types";
import { createGift } from "@/app/api/gift";
import { AxiosError } from "axios";
import { toast } from "sonner";

export type CardProps = {
  setGifts: Dispatch<SetStateAction<GiftProps[]>>;
};

export default function CreateGiftCard({ setGifts }: CardProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [giftName, setGiftName] = useState("");
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCreateGift = async () => {
    try {
      const giftData = await createGift(giftName);
      if (giftData.status === 200) {
        setGifts((prevGifts) => [...prevGifts, giftData.data.data]);
        setOpen(false);
        setError(false);
        setErrorMessage("");
        setGiftName("");
        toast("Gift has been created.");
      }
    } catch (error) {
      console.log("error in creating gift", error);
      if (error instanceof AxiosError) {
        console.log("error.response ", error.response);
        if (error.response && error.response.status === 400) {
          setError(true);
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };
  return (
    <>
      <Card
        onClick={handleOpenDialog}
        className="lg:max-w-md w-full cursor-pointer"
      >
        <CardHeader></CardHeader>
        <CardContent>
          <Image
            src="/images/plus_grey.png"
            alt="Card Image"
            className="w-full"
            width={300}
            height={300}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Gift</DialogTitle>
            <DialogDescription>
              Create a new gift for staff to redeem
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Gift Name
              </Label>
              <Input
                id="name"
                value={giftName}
                onChange={(values) => setGiftName(values.target.value)}
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
            <Button onClick={handleCreateGift} type="submit">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
