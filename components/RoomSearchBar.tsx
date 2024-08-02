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
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRooms } from "@/lib/actions";
import { useState } from "react";
import { Room } from "@prisma/client";

const formSchema = z.object({
  searchQuery: z.string(),
});

const RoomSearchBar = () => {
  const router = useRouter();

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

  return (
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
  );
};

export default RoomSearchBar;
