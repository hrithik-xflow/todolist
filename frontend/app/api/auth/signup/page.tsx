"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confPassword) {
      window.alert("Enter same password on both fields");
      return;
    }
    const body = {
      name,
      email,
      password,
    };
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!user) {
      window.alert("There was an error in creating your account");
      return;
    }
    console.log(user.json());
    router.push("/api/auth/signin");
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-50">
      <div className="flex border border-gray-200 shadow-md rounded-lg bg-white h-[60%] items-center justify-center flex-col gap-12 w-[50%]">
        <p className={`text-black text-4xl font-bold font-sans`}>Todo List</p>
        <div className="flex flex-col gap-5 w-[100%] items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Name:</p>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border border-gray-300 text-black px-1 w-[100%]"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Email:</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-gray-300 text-black px-1 w-[100%]"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Password:</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border border-gray-300 text-black px-1 w-[100%]"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Confirm Password:</p>
              <input
                onChange={(e) => setConfPassword(e.target.value)}
                type="password"
                className="border border-gray-300 text-black px-1 w-[100%]"
              />
            </div>
            <button
              className="text-white bg-blue-500 px-2 py-1 rounded text-md cursor-pointer"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </form>

          <button
            className="text-blue-500 underline cursor-pointer"
            onClick={() => router.push("/api/auth/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
