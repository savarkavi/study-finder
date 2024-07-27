"use client";

import { Room } from "@prisma/client";
import Link from "next/link";
import { BackgroundGradient } from "./aceternityui/background-gradient";
import { Button } from "./ui/button";

const RoomCard = ({ data }: { data: Room }) => {
  return (
    <BackgroundGradient
      className="w-full max-w-[400px] mx-auto"
      containerClassName="w-full max-w-[400px] mx-auto"
    >
      <div className="bg-slate-900 text-white p-6 rounded-3xl w-full max-w-[400px] h-[400px] flex flex-col justify-between">
        <h1 className="text-6xl font-bold">{data.name}</h1>
        <div className="flex flex-col gap-4 mt-8">
          <p>{data.description}</p>
          <p>Primary Language: {data.language}</p>
          <p>Github Repo: {data.githubLink}</p>
        </div>
        <Button variant="secondary" className="mt-8 w-full">
          Join
        </Button>
      </div>
    </BackgroundGradient>
  );
};

export default RoomCard;
