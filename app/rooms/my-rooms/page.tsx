import MyRoomsContainer from "@/components/MyRoomsContainer";

const MyRooms = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  return <MyRoomsContainer search={search} />;
};

export default MyRooms;
