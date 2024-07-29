"use server";

import prisma from "@/db";
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
