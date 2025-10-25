"use client";
import { TaskPayload } from "@/types/taskPayload";
import TaskList from "./TaskList";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";

export default function PageWrapper({ tasks }: { tasks: TaskPayload }) {
  return (
    <div className=" flex flex-col bg-gray-100 items-center h-[85vh] ">
      <div className="w-[100%] p-10">
        <div className="flex flex-row justify-between pb-5">
          <p className="text-blue-500 text-2xl font-bold">Your Todos</p>
          <Link
            href={`/todos/create`}
            className="text-white bg-blue-500 rounded px-3 py-2 cursor-pointer"
          >
            + New Todo
          </Link>
        </div>
        <TaskList parentTasks={tasks} />
      </div>
    </div>
  );
}
