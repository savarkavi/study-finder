import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="max-w-[1280px] mx-auto flex flex-col justify-center items-center gap-10 h-full p-2">
        <h2
          className={
            "text-white text-5xl lg:text-6xl xl:text-7xl md:text-center font-bold z-[99]"
          }
        >
          Board in passenger🚇. Find people online to code with👨🏻‍💻.
        </h2>
        <p className="text-gray-200 z-[99] md:text-center lg:text-xl max-w-[600px]">
          Dev Station is a platform to video call and share your screen with
          other developers online to code together.
        </p>
        <SignedOut>
          <Button className="z-[99]">Get Started</Button>
        </SignedOut>
        <SignedIn>
          <Button className="z-[99]" asChild>
            <Link href="/rooms">Browse Rooms</Link>
          </Button>
        </SignedIn>
      </div>
    </div>
  );
}
