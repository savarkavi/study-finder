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
  roomId: string | undefined;
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
  roomId,
}: IRoom) => {
  if (roomId) {
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    if (room) {
      await prisma.room.update({
        where: { id: roomId },
        data: { name, description, language, tags, githubLink, userId },
      });

      revalidatePath("/room/my-rooms");
    }
  } else {
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
  }
};

export const getRooms = async (search?: string) => {
  const rooms = await prisma.room.findMany();

  if (!search) {
    return rooms;
  } else {
    const filteredRooms = rooms.filter((room) =>
      room.tags.some((tag) => tag.toLowerCase().includes(search))
    );
    return filteredRooms;
  }
};

export const getUserRooms = async ({
  userId,
  search,
}: {
  userId: string;
  search: string;
}) => {
  const rooms = await prisma.room.findMany({ where: { userId } });

  if (!search) {
    return rooms;
  } else {
    const filteredRooms = rooms.filter((room) =>
      room.tags.some((tag) => tag.toLowerCase().includes(search))
    );
    return filteredRooms;
  }
};

export const getRoom = async (id: string) => {
  const room = await prisma.room.findUnique({ where: { id } });
  return room;
};

export const deleteRoom = async (roomId: string) => {
  await prisma.room.delete({ where: { id: roomId } });

  revalidatePath("/room/my-rooms");
};

export const getBookmarks = async (userId: string) => {
  const booksmarks = await prisma.bookmark.findMany({ where: { userId } });
  return booksmarks;
};

export const makeOrRemoveBookmark = async ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  const bookmark = await prisma.bookmark.findFirst({
    where: { userId, roomId },
  });

  if (bookmark) {
    await prisma.bookmark.delete({ where: { id: bookmark.id } });
    revalidatePath("/rooms");
    return "Room removed from favourites";
  } else {
    await prisma.bookmark.create({ data: { userId, roomId } });
    revalidatePath("/rooms");
    return "Room added to favourites";
  }
};

export const getBookmarkedRooms = async ({
  userId,
  search,
}: {
  userId: string;
  search: string;
}) => {
  const rooms = await prisma.room.findMany({
    where: {
      bookmark: {
        some: {
          userId,
        },
      },
    },
  });

  if (!search) {
    return rooms;
  } else {
    const filteredRooms = rooms.filter((room) =>
      room.tags.some((tag) => tag.toLowerCase().includes(search))
    );
    return filteredRooms;
  }
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
