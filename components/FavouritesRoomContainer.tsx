import { getBookmarkedRooms, getBookmarks } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import RoomCard from "./RoomCard";

const FavouritesRoomContainer = async ({ search }: { search: string }) => {
  const user = await currentUser();

  const rooms = await getBookmarkedRooms({
    userId: user?.publicMetadata.userId as string,
    search,
  });

  const bookmarks = await getBookmarks(user?.publicMetadata.userId as string);

  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-white text-4xl mt-8">No Rooms availaible :(</div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-4">
      {rooms.map((room) => {
        return <RoomCard key={room.id} data={room} bookmarks={bookmarks} />;
      })}
    </div>
  );
};

export default FavouritesRoomContainer;
