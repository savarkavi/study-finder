import Header from "@/components/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import React from "react";

const RoomPage = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header />
      <VideoPlayer />
    </main>
  );
};

export default RoomPage;
