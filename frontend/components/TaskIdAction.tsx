"use client";

import { graphQLClient } from "@/lib/graphql-client";
import { DELETE_TODOS } from "@/lib/queries";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TaskIdAction({ id }: { id: number }) {
  const router = useRouter();

  const deleteTodo = useMutation({
    mutationFn: async (input: { id: number }) => {
      const res = await graphQLClient.request(DELETE_TODOS, { input });
      return res;
    },
    onSuccess: () => {
      router.push("/todos");
    },
    onError: () => {
      console.log("There was an error while deleting the todo.");
    },
  });

  const handleDelete = () => {
    let choice = window.confirm(`Delete Task?`);
    if (!choice) return;
    deleteTodo.mutate({
      id: Number(id),
    });
  };

  return (
    <div className="flex flex-row justify-between">
      <Link href={`/todos`} className="text-blue-500">
        ← Back to Todos
      </Link>
      <div className="flex flex-row gap-2">
        <Link
          href={`/todos/${id}/edit`}
          className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer"
        >
          Edit
        </Link>
        <p
          className="text-white px-5 py-1 bg-red-500 rounded px-2 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    </div>
  );
}

export default TaskIdAction;
