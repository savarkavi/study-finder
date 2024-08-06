import Header from "@/components/Header";
import RoomSidebar from "@/components/RoomSidebar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getRoom } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const RoomPage = async ({ params: { id } }: { params: { id: string } }) => {
  const room = await getRoom(id);

  if (!room) {
    toast.error("No room found");
    return redirect("/rooms");
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header className="bg-[#24243e]" />
      <div className="flex flex-col xl:flex-row justify-between xl:p-16 gap-10 relative">
        <VideoPlayer room={room} />
        <RoomSidebar room={room} />
      </div>
    </main>
  );
};

export default RoomPage;
