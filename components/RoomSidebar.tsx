import { Room } from "@prisma/client";
import { GitBranch, Github } from "lucide-react";

const RoomSidebar = ({ room }: { room: Room }) => {
  return (
    <div className="flex-[20%] text-white border rounded-xl p-8 h-[500px] bg-[#0f0c29] sticky top-0 right-0">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">{room.name}</h1>
        <div className="flex items-center gap-2">
          <Github />
          <p>Github Repo</p>
        </div>
        <p>{room.description}</p>
        <p>{`Programming Language: ${room.language}`}</p>
        <div className="flex gap-3 flex-wrap">
          {room.tags.map((tag, i) => {
            return (
              <div
                key={i}
                className="px-3 py-1 rounded-3xl bg-[#302b63] text-sm"
              >
                {tag.trim()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomSidebar;
