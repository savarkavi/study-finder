"use client";

import { Bookmark, Room } from "@prisma/client";
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
import { BookmarkIcon, Loader, Pencil, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { deleteRoom, makeOrRemoveBookmark } from "@/lib/actions";
import toast from "react-hot-toast";
import CreateRoomForm from "./CreateRoomForm";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const RoomCard = ({
  data,
  isMyRoom,
  bookmarks,
}: {
  data: Room;
  isMyRoom?: boolean;
  bookmarks?: Bookmark[];
}) => {
  const [deleteLoader, setDeleteLoader] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const onTagClick = (tag: string) => {
    router.push(`/rooms?search=${tag}`);
  };

  const handleRoomDelete = async (roomId: string) => {
    try {
      setDeleteLoader(true);
      await deleteRoom(roomId);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the room");
    } finally {
      setDeleteLoader(false);
    }
  };

  const handleMakeAndRemoveBookmark = async () => {
    try {
      const res = await makeOrRemoveBookmark({
        userId: user?.publicMetadata.userId as string,
        roomId: data.id,
      });
      toast.success(res);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <BackgroundGradient
      className="w-full max-w-[400px] mx-auto"
      containerClassName="w-full max-w-[400px] mx-auto"
    >
      <div className="bg-slate-900 text-white p-6 rounded-3xl w-full max-w-[400px] h-[400px] flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="w-[250px] text-left">
                <h1 className="text-2xl sm:text-4xl font-bold truncate ...">
                  {data.name}
                </h1>
                <TooltipContent>{data.name}</TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          {isMyRoom && (
            <div className="flex items-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex items-center gap-2 p-2 text-sm">
                    <Trash className="w-4" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your room.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRoomDelete(data.id)}
                      className="flex justify-center items-center w-[100px]"
                    >
                      {deleteLoader ? <Loader className="w-4" /> : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <CreateRoomForm data={data}>
                <div className="flex items-center gap-2 p-2 text-sm cursor-pointer">
                  <Pencil className="w-4" />
                </div>
              </CreateRoomForm>
            </div>
          )}
          {!isMyRoom && (
            <BookmarkIcon
              className={cn(
                "w-5 cursor-pointer",
                bookmarks?.find((bookmark) => bookmark.roomId === data.id) &&
                  "fill-white"
              )}
              onClick={handleMakeAndRemoveBookmark}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 mt-8 overflow-y-scroll">
          <p className="text-sm sm:text-base font-semibold">
            {data.description}
          </p>
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
