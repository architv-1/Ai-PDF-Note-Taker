"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function Page() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  // Function must be defined BEFORE using inside useEffect
  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageURL: user?.imageUrl,
      userName: user?.fullName,
    });

    console.log(result);
  };

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-2 w-fit">
      <Button>Click Karo</Button>
      <Button onClick={CheckUser}>Check Karo Paape</Button>
      
    </div>
  );
}

export default Page;
