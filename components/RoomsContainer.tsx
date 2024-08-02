import prisma from "@/db";
import RoomCard from "./RoomCard";
import { revalidatePath } from "next/cache";
import { getRooms } from "@/lib/actions";

const RoomsContainer = async ({ search }: { search: string }) => {
  // console.log(searchParmas);

  const rooms = await getRooms(search?.toLowerCase());

  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-white text-4xl mt-8">No Rooms availaible :(</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-4">
      {rooms.map((room) => {
        return <RoomCard key={room.id} data={room} />;
      })}
    </div>
  );
};

export default RoomsContainer;
