import Header from "@/components/Header";
import RoomsContainer from "@/components/RoomsContainer";
import RoomSearchBar from "@/components/RoomSearchBar";

const RoomsPage = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header className="bg-[#24243e]" />
      <div className="w-full min-h-screen z-[99] flex justify-center">
        <div className="w-full max-w-[1280px] mx-auto mt-16">
          <RoomSearchBar />
          <RoomsContainer />
        </div>
      </div>
    </main>
  );
};

export default RoomsPage;
