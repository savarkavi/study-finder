import prisma from "@/db";
import RoomCard from "./RoomCard";
import { revalidatePath } from "next/cache";

const RoomsContainer = async () => {
  const rooms = await prisma.room.findMany();

  revalidatePath("/rooms");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-4 py-4">
      {rooms.map((room) => {
        return <RoomCard key={room.id} data={room} />;
      })}
    </div>
  );
};

export default RoomsContainer;
