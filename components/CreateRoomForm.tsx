"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRoom } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Room name is required" }).max(50),
  desc: z.string().min(1, { message: "Room description is required" }).max(100),
  language: z.string().min(1, { message: "Select a programming language" }),
  tags: z.string().optional(),
  githubLink: z.string().min(1, { message: "Githib link is required" }),
});

const CreateRoomForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      language: "",
      tags: "",
      githubLink: "",
    },
  });

  const { user } = useUser();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const tags = values.tags?.split(", ");

    try {
      await createRoom({
        name: values.name,
        description: values.desc,
        language: values.language,
        tags: tags ? tags : [],
        githubLink: values.githubLink,
        userId: user?.publicMetadata.userId as string,
      });
      toast.success("Room created");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the room");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-[999]">
        <DialogHeader>
          <DialogTitle>Create a Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary programming language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[999]">
                      <SelectItem value="JavaScript">JavaScipt</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="SQL">SQL</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                      <SelectItem value="Shell">Shell</SelectItem>
                      <SelectItem value="Java">Java</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="C#">C#</SelectItem>
                      <SelectItem value="C++">C++</SelectItem>
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="Go">Go</SelectItem>
                      <SelectItem value="Rust">Rust</SelectItem>
                      <SelectItem value="Kotlin">Kotlin</SelectItem>
                      <SelectItem value="Ruby">Ruby</SelectItem>
                      <SelectItem value="Lua">Lua</SelectItem>
                      <SelectItem value="Dart">Dart</SelectItem>
                      <SelectItem value="Assembly">Assembly</SelectItem>
                      <SelectItem value="Swift">Swift</SelectItem>
                      <SelectItem value="R">R</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="react, nextJS, mongoDb" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the link to your project repo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex justify-center items-center w-24"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomForm;
