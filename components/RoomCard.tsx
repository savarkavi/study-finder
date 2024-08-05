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
import { usePathname, useRouter } from "next/navigation";
import { Ellipsis, Loader, Pencil, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { deleteRoom } from "@/lib/actions";
import toast from "react-hot-toast";

const RoomCard = ({ data, isMyRoom }: { data: Room; isMyRoom?: boolean }) => {
  // const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  // const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const router = useRouter();

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
                <h1 className="text-4xl font-bold truncate ...">{data.name}</h1>
                <TooltipContent>{data.name}</TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          {isMyRoom && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col">
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="flex items-center gap-2 p-2 text-sm">
                        <Trash className="w-4" />
                        Delete Room
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your room.
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
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Dialog>
                    <DialogTrigger>
                      <div className="flex items-center gap-2 p-2 text-sm">
                        <Pencil className="w-4" />
                        Edit Room
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
