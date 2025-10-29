"use client";
import { TaskPayload } from "@/types/taskPayload";
import TaskList from "./TaskList";
import { useSession } from "next-auth/react";

export default function PageWrapper({ tasks }: { tasks: TaskPayload }) {
  const session = useSession();
  return (
    <div className=" flex flex-col bg-gray-100 items-center h-[91.5vh] ">
      <div className="w-[100%] p-10">
        <div className="flex flex-row justify-between pb-5">
          <p className="text-black text-xl sm:text-2xl md:text-3xl font-bold">{`${session.data?.user?.name}'s Tasks`}</p>
        </div>
        <TaskList parentTasks={tasks} />
      </div>
    </div>
  );
}
