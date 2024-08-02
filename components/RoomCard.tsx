"use client";

import { Room } from "@prisma/client";
import Link from "next/link";
import { BackgroundGradient } from "./aceternityui/background-gradient";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

const RoomCard = ({ data }: { data: Room }) => {
  const router = useRouter();

  const onTagClick = (tag: string) => {
    router.push(`/rooms?search=${tag}`);
  };

  return (
    <BackgroundGradient
      className="w-full max-w-[400px] mx-auto"
      containerClassName="w-full max-w-[400px] mx-auto"
    >
      <div className="bg-slate-900 text-white p-6 rounded-3xl w-full max-w-[400px] h-[400px] flex flex-col justify-between">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <h1 className="text-4xl font-bold truncate ...">{data.name}</h1>
              <TooltipContent>{data.name}</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
          <p className="font-semibold">{data.description}</p>
          <p>Primary Language: {data.language}</p>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-3xl bg-[#302b63] text-sm cursor-pointer hover:bg-[#24243e]"
                onClick={() => onTagClick(tag)}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          <p>Github Repo: {data.githubLink}</p>
        </div>
        <Button variant="secondary" className="mt-8 w-full">
          <Link href={`/room/${data.id}`}>Join</Link>
        </Button>
      </div>
    </BackgroundGradient>
  );
};

export default RoomCard;
