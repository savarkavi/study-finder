import Header from "@/components/Header";
import RoomSearchBar from "@/components/RoomSearchBar";

const RoomsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <Header className="bg-[#24243e]" />
      <div className="w-full min-h-screen z-[99] flex justify-center">
        <div className="w-full max-w-[1280px] mx-auto mt-16 flex flex-col items-center gap-16 p-4 lg:px-0">
          <RoomSearchBar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default RoomsLayout;
