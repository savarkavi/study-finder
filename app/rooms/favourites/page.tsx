import FavouritesRoomContainer from "@/components/FavouritesRoomContainer";

const FavouriteRooms = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  return <FavouritesRoomContainer search={search} />;
};

export default FavouriteRooms;
