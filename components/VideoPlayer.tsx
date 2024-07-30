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

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2x6MTNpbHFvMDAwMGlhY2JjeWQ4eDUwYSJ9.ECZO6-eA4fnKeZ2zputvKADy45ZhG5JbUeo3y9bMpvE";

export const VideoPlayer = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const userId = user.publicMetadata.userId as string;
    const client = new StreamVideoClient({
      apiKey,
      user: { id: userId },
      token,
    });
    setClient(client);
    const call = client.call("default", "my-first-call");
    setCall(call);
    call.join({ create: true });
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
