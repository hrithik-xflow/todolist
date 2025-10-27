"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const session = useSession(authOptions);
  const [dropDown, setDropDown] = useState(false);

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
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          src={session.data?.user?.image}
          className="rounded-full h-10 cursor-pointer"
          alt="User Image"
          onClick={() => setDropDown(!dropDown)}
        />
        {dropDown && (
          <div className="absolute mt-2 top-15 bg-white text-black px-3 py-3 border border-gray-200 rounded">
            <ul>
              <li
                className="cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        {/* <button
          className="text-lg font-mono text-blue-500 font-bold cursor-pointer"
          onClick={handleSignOut}
        >
          Logout
        </button> */}
      </div>
    </div>
  );
}
