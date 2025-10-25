"use client";
import { useCreateTodoMutation } from "@/hooks/useCreateTodo";
import { graphQLClient } from "@/lib/graphql-client";
import { CREATE_TODOS } from "@/lib/queries";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  description: string;
};

export default function Page() {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  document.title = `Create | Todo List`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({});

  const createTodo = useCreateTodoMutation();

  const onSubmit = (data: FormData) => {
    createTodo.mutate({
      title: data.title,
      description: data.description,
      completed,
    });
  };

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
                <div className="flex flex-col gap-2 items-start w-[70%]">
                  <input
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                    className="font-bold text-3xl border rounded border-gray-500 w-[100%] px-2 py-1"
                  />
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

              <div>
                <textarea
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="text-md border border-gray-500 rounded w-[70%]  text-left text-wrap px-2 py-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer mt-5"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
