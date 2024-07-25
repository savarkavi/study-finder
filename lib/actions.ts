"use server";

import prisma from "@/db";

interface IUser {
  name: string;
  username: string;
  email: string;
}

interface IRoom {
  name: string;
  description: string;
  language: string;
  githubLink: string;
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
  githubLink,
}: IRoom) => {
  await prisma.room.create({
    data: {
      name,
      description,
      language,
      githubLink,
      // userId:
    },
  });
};
