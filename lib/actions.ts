"use server";

import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { revalidatePath } from "next/cache";

interface IUser {
  name: string;
  username: string;
  email: string;
}

interface IRoom {
  name: string;
  description: string;
  language: string;
  tags: string[];
  githubLink: string;
  userId: string;
}

export const createUser = async ({ name, username, email }: IUser) => {
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
    },
  });

  return user;
};

export const createRoom = async ({
  name,
  description,
  language,
  tags,
  githubLink,
  userId,
}: IRoom) => {
  await prisma.room.create({
    data: {
      name,
      description,
      language,
      tags,
      githubLink,
      userId,
    },
  });

  revalidatePath("/rooms");
};

export const getRoom = async (id: string) => {
  const room = await prisma.room.findUnique({ where: { id } });
  return room;
};

export const getToken = async () => {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const secretKey = process.env.STREAM_SECRET!;

  const user = await currentUser();
  const userId = user?.publicMetadata.userId as string;

  if (!user) throw new Error("User not authenticated");

  const client = new StreamClient(apiKey, secretKey);
  const token = client.createToken(userId);

  return token;
};
