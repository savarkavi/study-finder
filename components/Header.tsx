import Image from "next/image";
import { Anton } from "next/font/google";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import CreateRoomForm from "./CreateRoomForm";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <div className="bg-black/25 p-2 shadow-lg sticky top-0 z-[999]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image src="/dev-station-logo.svg" alt="logo" fill />
          </div>
          <h1 className={cn("text-white font-bold text-xl", anton.className)}>
            DEV STATION
          </h1>
        </Link>
        <div>
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <CreateRoomForm />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
