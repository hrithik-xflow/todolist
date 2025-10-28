"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      window.alert("Incorrect Credentials");
      return;
    }
    router.push("/todos");
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[url('/bg1.jpg')] bg-cover">
      <div className="flex border border-gray-200 shadow-md rounded-lg bg-white h-[60%] items-center justify-center flex-col gap-12 w-[80%] lg:w-[50%] md:w-[70%] sm:w-[90%]">
        <p className={`text-blue-700 text-4xl font-bold font-mono`}>
          Todo List
        </p>
        <div className="flex flex-col gap-5 w-[70%] items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-5"
          >
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Email:</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-gray-300 rounded text-black px-1 w-[100%] h-8"
              />
            </div>
            <div className="w-[100%] flex flex-col mx-30">
              <p className="text-black">Password:</p>
              <div className="flex flex-row gap-2 items-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  className="border border-gray-300 rounded text-black px-1 w-[100%] h-8"
                />
                <p
                  className="text-white cursor-pointer bg-blue-500 t px-2 py-1 rounded-full text-sm"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </p>
              </div>
            </div>
            <button className="text-white bg-blue-500 px-5 py-1 rounded text-md cursor-pointer">
              Sign In
            </button>
          </form>

          <button
            className="text-blue-500 underline cursor-pointer"
            onClick={() => router.push("/api/auth/signup")}
          >
            Dont have an account? Sign Up
          </button>

          <p className="text-black">Or login with </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/todos" })}
            type="submit"
            className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition"
          >
            <div className="w-6 h-6 mr-3">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Sign in</span>
            <span className="sr-only">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
