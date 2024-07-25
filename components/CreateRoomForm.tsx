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

const formSchema = z.object({
  name: z.string().min(1, { message: "Room name is required" }).max(50),
  desc: z.string().min(1, { message: "Room description is required" }).max(100),
  language: z.string().min(1, { message: "Select a programming language" }),
  githubLink: z.string().min(1, { message: "Githib link is required" }),
});

const CreateRoomForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      language: "",
      githubLink: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createRoom({
      name: values.name,
      description: values.desc,
      language: values.language,
      githubLink: values.githubLink,
    });
  }

  return (
    <Dialog>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is your room name.</FormDescription>
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
                  <FormDescription>
                    This is your room description.
                  </FormDescription>
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
                        <SelectValue placeholder="Select a programming language" />
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
                  <FormDescription>
                    This is the primary programming language.
                  </FormDescription>
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomForm;
