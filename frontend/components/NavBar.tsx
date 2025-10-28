"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import image from "../public/user-icon.png";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();
  const session = useSession();
  const [dropDown, setDropDown] = useState(false);

  const handleSignOut = () => {
    const confirmation = window.confirm("Do you want to logout?");
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
        <div className="flex flex-row gap-5 items-center">
          <p className="text-black">{session.data?.user?.name}</p>
          <div className="flex items-center justify-center">
            <Image
              src={session?.data?.user?.image || image}
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full border border-black cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown && (
              <div className="absolute mt-2 top-15 bg-white text-black px-3 py-3 border border-gray-200 rounded">
                <ul>
                  <li className="cursor-pointer" onClick={handleSignOut}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
