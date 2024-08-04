"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRooms } from "@/lib/actions";
import { useState } from "react";
import { Room } from "@prisma/client";
import Link from "next/link";

const formSchema = z.object({
  searchQuery: z.string(),
});

const RoomSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.searchQuery) {
      router.push("/rooms");
    } else {
      router.push(`rooms/?search=${values.searchQuery}`);
    }
  }

  const clearFilterClick = () => {
    router.push("/rooms");
    form.reset();
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col gap-6 items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] relative"
        >
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="search a room through keywords like react, nextJS, etc"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 rounded-l-none flex gap-2"
          >
            <SearchIcon className="w-4" />
            Search
          </Button>
        </form>
      </Form>
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          <Button variant="link" className="text-white text-base">
            <Link href="/rooms">All Rooms</Link>
          </Button>
          <Button variant="link" className="text-white text-base">
            <Link href="/rooms/my-rooms">My Rooms</Link>
          </Button>
          <Button variant="link" className="text-white text-base">
            <Link href="favourites">Favourites</Link>
          </Button>
        </div>
        {searchParams.get("search") && (
          <div
            className="text-black flex items-center gap-1 cursor-pointer text-sm bg-white py-1 px-3 rounded-lg"
            onClick={clearFilterClick}
          >
            Clear filters <X className="w-4" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSearchBar;
