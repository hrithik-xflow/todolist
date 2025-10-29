"use client";

import Loading from "@/app/todos/loading";
import { graphQLClient } from "@/lib/graphql-client";
import { DELETE_TODOS } from "@/lib/queries";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function TaskIdAction({ id }: { id: number }) {
  const router = useRouter();
  const session = useSession();
  // console.log(session);

  const deleteTodo = useMutation({
    mutationFn: async (input: { id: number }) => {
      const gqc = graphQLClient(session.data?.user?.accessToken);
      const res = await gqc.request(DELETE_TODOS, { input });
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
    const choice = window.confirm(`Delete Task?`);
    if (!choice) return;
    deleteTodo.mutate({
      id: Number(id),
    });
  };

  if (!session || session.status === "unauthenticated")
    router.push("/api/auth/signin");
  if (session.status === "loading") return <Loading />;

  return (
    <div className="flex flex-row justify-between items-center">
      <Link href={`/todos`} className="text-blue-500 text-sm sm:text-md">
        ← Back to Todos
      </Link>
      <div className="flex flex-row gap-2">
        <Link
          href={`/todos/${id}/edit`}
          className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer text-sm sm:text-md"
        >
          Edit
        </Link>
        <p
          className="text-white px-5 py-1 bg-red-500 rounded px-2 cursor-pointer text-sm sm:text-md"
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    </div>
  );
}

export default TaskIdAction;
