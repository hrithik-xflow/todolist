"use client";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import { TaskPayload } from "@/types/taskPayload";
import { TaskListComp } from "./TaskListComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function TaskList({
  parentTasks,
}: {
  parentTasks: TaskPayload;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [isMounted, setIsMounted] = useState(false);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const [isMobile, setIsMobile] = useState(false);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if (!params.get("search") || params.get("search") == "")
      params.delete("search");
    if (!params.get("filter") || params.get("filter") == "")
      params.delete("filter");
    if (!params.get("page") || params.get("page") == "") params.delete("page");

    return params.toString();
  };

  const handlePageChange = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`${pathname}?${createQueryString("page", value.toString())}`);
  };

  useEffect(() => {
    if (!isMounted) return;
    const debounce = setTimeout(() => {
      router.push(`${pathname}?${createQueryString("search", query)}`);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [query, router]);

  useEffect(() => {
    if (page > parentTasks.totalPages && parentTasks.totalCount > 0)
      router.push("/todos");
  }, [page, parentTasks.totalPages, router]);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.outerWidth < 800);
    checkWidth(); // run initially
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 justify-between items-center">
        <div className="flex flex-row gap-5 w-[80%] sm:w-[60%] md:w-[70%] lg:w-[80%] ">
          <input
            type="text"
            className="border border-gray-500 rounded w-[100%] text-xs sm:text-sm text-black px-2 py-1"
            onChange={(e) => {
              setIsMounted(true);
              setQuery(e.target.value);
            }}
            placeholder="Search"
          />
          <select
            name="taskSelect"
            id="taskSelect"
            aria-label="TaskList"
            className="border border-gray-500 rounded text-black px-2 py-1 w-[50%] text-xs sm:text-sm"
            defaultValue={"all"}
            onChange={(e) => {
              router.push(
                `${pathname}?${createQueryString("filter", e.target.value)}`
              );
            }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>
        <Link
          href={`/todos/create`}
          className="text-white bg-blue-500 rounded px-3 py-2 cursor-pointer text-center items-center"
        >
          {isMobile ? "+" : "+ New Todo"}
        </Link>
      </div>
      {parentTasks.tasks.length == 0 ? (
        <div className="flex flex-col gap-3 text-black text-center text-xl h-[50vh] items-center justify-center">
          <p>You have no tasks on board!</p>
          <p>Click on &quot;+ New Todo&quot; to create a new task.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
            {parentTasks.tasks.map((item: Task) => {
              {
                return (
                  <Link href={`/todos/${item.id}`} key={item.id}>
                    <TaskListComp item={item} />
                  </Link>
                );
              }
            })}
          </div>
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={parentTasks.totalPages}
          />
        </div>
      )}
    </div>
  );
}
