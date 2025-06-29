"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "./button";
import { links } from "@/utils/links";
import UserIcon from "./UserIcon";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import SignOutLink from "./SignOutLink";

function LinksDropdown() {
  const { userId } = useAuth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-3 max-w-[120px] border-pink-400 text-pink-700 hover:bg-pink-100 hover:text-pink-900 transition-all"
        >
          <LuAlignLeft className="w-5 h-5" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-44 bg-pink-50 text-pink-800 border border-pink-200 shadow-lg"
        align="start"
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem className="hover:bg-pink-100 hover:text-pink-900 font-medium transition-colors">
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-pink-200" />

          <DropdownMenuItem className="hover:bg-pink-100 hover:text-pink-900 font-medium transition-colors">
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          {links.map((link) => {
            if (link.label === "dashboard" && !isAdmin) return null;
            return (
              <DropdownMenuItem
                key={link.href}
                className="hover:bg-pink-100 hover:text-pink-900 font-medium transition-colors"
              >
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator className="bg-pink-200" />

          <DropdownMenuItem className="hover:bg-pink-100 hover:text-pink-900 font-medium transition-colors">
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
