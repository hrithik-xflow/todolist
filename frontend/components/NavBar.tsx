"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();

  const handleSignOut = () => {
    let confirmation = window.confirm("Do you want to logout?");
    if (!confirmation) return;

    signOut({ callbackUrl: "/api/auth/signin" });
  };

  return (
    <div className="w-[100%] py-5 flex flex-row justify-between px-10 border border-b bg-white h-20">
      <button
        className="text-2xl font-bold font-mono text-blue-500 cursor-pointer"
        onClick={() => router.push("/todos")}
      >
        Todo List
      </button>

      <button
        className="text-lg font-mono text-blue-500 font-bold cursor-pointer"
        onClick={handleSignOut}
      >
        Logout
      </button>
    </div>
  );
}
