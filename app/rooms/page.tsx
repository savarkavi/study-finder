import AllRoomsContainer from "@/components/AllRoomsContainer";

const RoomsPage = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  return <AllRoomsContainer search={search} />;
};

export default RoomsPage;
