"use client";
import NotFound from "@/components/NotFound";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../loading";

type FormData = {
  id: String;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: string;
};

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  let param = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [fetched, setFetched] = useState(false);

  const id = param.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      id: id,
      title: title,
      description: description,
      completed: completed,
      updatedAt: updatedAt,
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch(`http://localhost:3000/todos/${id}`)
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
        setCreatedAt(new Date(data.createdAt).toLocaleString());

        setUpdatedAt(new Date(data.updatedAt).toLocaleString());

        document.title = `Editing: ${data.title} | Todo List`;

        reset({
          title: data.title,
          description: data.description,
          completed: data.completed,
          updatedAt: data.updatedAt,
        });
      } catch (error) {
        console.error("There is an error");
      }
    }
    getData();
  }, []);

  console.log(session);
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  if (!session) return null;

  const onSubmit = async (data: FormData) => {
    const url = `http://localhost:3000/todos/${id}`;
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
        },
        body: JSON.stringify(body),
      });

      if (!res) {
        throw new Error(`Could not update the Todo`);
      }
      const result = await res.json();
      console.log(result);
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
          <Link href={`/todos`} className="text-blue-500">
            ← Back to Todos
          </Link>
          <div className="bg-white items-center p-5">
            <div className="flex flex-col gap-5 rounded ">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5 items-start w-[70%]">
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="font-bold text-3xl border rounded border-gray-500 w-[100%] px-2 py-1"
                  />
                  <div className="flex flex-row gap-2 justify-center">
                    <p>Completion Status: </p>
                    <button
                      type="button"
                      onClick={() => setCompleted(!completed)}
                      className={`text-sm px-2 py-1 rounded cursor-pointer ${
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
                  className="w-[100%] h-[55vh] resize-none overflow-y-auto p-5 border border-gray-500 rounded"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                type="submit"
                className="text-white px-5 py-1 bg-blue-500 rounded cursor-pointer"
              >
                Update
              </button>
              <Link
                href={`/todos/${id}`}
                className="text-black px-5 py-1 bg-gray-200 rounded cursor-pointer"
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
