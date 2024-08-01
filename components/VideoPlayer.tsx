"use client";

import { useUser } from "@clerk/nextjs";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { getToken } from "@/lib/actions";
import { Room } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const VideoPlayer = ({ room }: { room: Room }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const userId = user.publicMetadata.userId as string;
    const client = new StreamVideoClient({
      apiKey,
      user: { id: userId, name: user.username || userId, image: user.imageUrl },
      tokenProvider: getToken,
    });
    setClient(client);
    const call = client.call("default", room.id);
    setCall(call);
    call.join({ create: true });

    return () => {
      client.disconnectUser();
      setClient(null);
      call.endCall();
      setCall(null);
    };
  }, [user, room]);

  if (!isLoaded)
    return (
      <div className="flex-[80%] w-full flex justify-center mt-16">
        <Loader2 className="animate-spin text-white text-3xl" />
      </div>
    );

  return (
    client &&
    call && (
      <div className="flex-[70%] border p-8 rounded-xl w-full bg-[#0f0c29]">
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <StreamTheme>
              <SpeakerLayout />
              <CallControls onLeave={() => router.push("/rooms")} />
              <CallParticipantsList onClose={() => {}} />
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      </div>
    )
  );
};
