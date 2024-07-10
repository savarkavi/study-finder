"use server";

import prisma from "@/db";

interface IUser {
  name: string;
  username: string;
  email: string;
}

export const createUser = async ({ name, username, email }: IUser) => {
  await prisma.user.create({
    data: {
      name,
      username,
      email,
    },
  });
};
