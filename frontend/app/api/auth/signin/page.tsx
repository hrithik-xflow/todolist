"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/todos",
    });
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-50">
      <div className="flex border border-gray-200 shadow-md rounded-lg bg-white h-[50%] items-center justify-center flex-col gap-12 px-50">
        <p className="text-black text-4xl font-bold">Todo List</p>
        <div className="flex flex-col gap-10 items-center w-[100%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <p className="text-black">Email:</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-gray-300 text-black px-1"
              />
            </div>
            <div>
              <p className="text-black">Password:</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border border-gray-300 text-black px-1 w-[100%]"
              />
            </div>
            <button className="text-white bg-blue-500 px-2 py-1 rounded text-md">
              Sign In
            </button>
          </form>
          <p className="text-black">Or login with </p>
          <button
            type="submit"
            className="bg-blue-500 rounded px-2 py-2 text-white cursor-pointer"
            onClick={() => signIn("google", { callbackUrl: "/todos" })}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
