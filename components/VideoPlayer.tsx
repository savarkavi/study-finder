"use client";

import { useUser } from "@clerk/nextjs";
import {
  Call,
  CallControls,
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

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const VideoPlayer = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const userId = user.publicMetadata.userId as string;
    const client = new StreamVideoClient({
      apiKey,
      user: { id: userId, name: user.username || userId, image: user.imageUrl },
      tokenProvider: getToken,
    });
    setClient(client);
    const call = client.call("default", "my-first-call");
    setCall(call);
    call.join({ create: true });

    return () => {
      client.disconnectUser();
      setClient(null);
    };
  }, [user]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout />
            <CallControls />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    )
  );
};
