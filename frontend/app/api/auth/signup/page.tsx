"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confPassword) {
      window.alert("Enter same password on both fields");
      return;
    }

    if (!name.trim()) {
      window.alert("Enter a valid name");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      window.alert("Password must be atleast 8 characters");
      return;
    }

    const body = {
      name,
      email,
      password,
    };
    // console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`);
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log(user);
    if (!user) {
      window.alert("There was an error in creating your account");
      return;
    }
    // console.log(user.json());
    router.push("/api/auth/signin");
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[url('/bg1.jpg')] bg-cover bg-gray-50">
      <div className="flex border border-gray-200 shadow-md rounded-lg bg-white h-[70%] sm:[80%] md:[90%]  items-center justify-center flex-col gap-10 w-[70%] lg:w-[50%] md:w-[70%] sm:w-[90%]">
        <p
          className={`text-blue-700 text-2xl sm:text-3xl md:text-4xl font-bold font-mono`}
        >
          Todo List
        </p>
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-[70%] items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 w-[100%]"
          >
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Name:</p>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border border-gray-300 rounded text-black px-1 w-[100%] h-6 sm:h-7 md:h-8"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Email:</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-gray-300 rounded text-black px-1 w-[100%] h-6 sm:h-7 md:h-8"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Password:</p>
              <div className="flex flex-row gap-2 items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={show1 ? "text" : "password"}
                  className="border border-gray-300 rounded text-black px-1 w-[100%] h-6 sm:h-7 md:h-8"
                />
                <p
                  className="text-white cursor-pointer bg-blue-500 px-2 py-1 rounded-full text-xs sm:text-sm"
                  onClick={() => setShow1(!show1)}
                >
                  {show1 ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Confirm Password:</p>
              <div className="flex flex-row gap-2 items-center">
                <input
                  onChange={(e) => setConfPassword(e.target.value)}
                  type={show2 ? "text" : "password"}
                  className="border border-gray-300 rounded text-black px-1 w-[100%] h-6 sm:h-7 md:h-8"
                />
                <p
                  className="text-white cursor-pointer bg-blue-500 px-2 py-1 rounded-full text-xs sm:text-sm"
                  onClick={() => setShow2(!show2)}
                >
                  {show2 ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-500 px-5 py-1 rounded text-sm sm:text-md cursor-pointer mt-3" // onClick={handleSubmit}
            >
              Create Account
            </button>
          </form>

          <button
            className="text-blue-500 underline cursor-pointer text-xs sm:text-sm"
            onClick={() => router.push("/api/auth/signin")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
