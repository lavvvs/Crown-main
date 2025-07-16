"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import { SignOutButton, useClerk } from "@clerk/nextjs";

function SignOutLink() {
  const { signOut } = useClerk();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    toast({ description: "Logged out successfully!" });

    // small delay so the toast is visible before redirect
    setTimeout(async () => {
      await signOut();
      router.push("/"); // redirect to home after logout
    }, 500);
  }, [toast, router, signOut]);

  return (
    <button onClick={handleLogout} className="w-full text-left">
      Logout
    </button>
  );
}

export default SignOutLink;
