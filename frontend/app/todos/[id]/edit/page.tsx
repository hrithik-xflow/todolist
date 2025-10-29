"use client";
import NotFound from "@/components/NotFound";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../loading";

type FormData = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const param = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [fetched, setFetched] = useState(false);

  const id = param.id;
  // console.log(session);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: title,
      description: description,
      completed: completed,
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        )
          .then((res) => {
            if (!res.ok) return;
            return res.json();
          })
          .catch((error) => console.error(error));

        if (!data) return;

        setFetched(true);
        // console.log(data);
        setTitle(data.title);
        setDescription(data.description);
        setCompleted(data.completed);

        document.title = `Editing: ${data.title} | Todo List`;

        reset({
          title: data.title,
          description: data.description,
          completed: data.completed,
        });
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  // console.log(session);
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  if (!session) return null;

  const onSubmit = async (data: FormData) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`;
    const body = {
      title: data.title,
      description: data.description,
      completed: completed,
    };
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!res) {
        throw new Error(`Could not update the Todo`);
      }
      router.push(`/todos/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!fetched) return <NotFound />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-5 bg-gray-100 w-max-[80%] h-max-[80%] m-5 border border-black rounded text-black p-5">
          <Link href={`/todos`} className="text-blue-500 text-sm sm:text-md">
            ← Back to Todos
          </Link>
          <div className="bg-white items-center p-5">
            <div className="flex flex-col gap-5 rounded ">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5 items-start w-[70%]">
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="font-bold text-xl sm:text-2xl md:text-3xl border rounded border-gray-500 w-[100%] px-2 py-1"
                  />
                  <div className="flex flex-row gap-2 text-xs sm:text-sm md:text-md justify-center items-center">
                    <p>Completion Status: </p>
                    <button
                      type="button"
                      onClick={() => setCompleted(!completed)}
                      className={`text-xs sm:text-sm md:text-md px-2 py-1 rounded cursor-pointer ${
                        completed === true
                          ? `bg-green-100 text-green-500`
                          : `bg-red-100 text-red-500`
                      }`}
                    >
                      {completed == true ? "Completed" : "Pending"}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-[100%] h-[55vh] resize-none overflow-y-auto p-5 border border-gray-500 text-xs sm:text-sm md:text-md lg:text-lg rounded"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                type="submit"
                className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer text-sm sm:text-md"
              >
                Update
              </button>
              <Link
                href={`/todos/${id}`}
                className="text-black px-5 py-1 bg-blue-200 rounded px-2 cursor-pointer text-sm sm:text-md"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
