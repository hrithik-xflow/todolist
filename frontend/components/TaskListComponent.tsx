import { Task } from "@/types/task";

export function TaskListComp({ item }: { item: Task }) {
  const maxChar = 110;
  return (
    <div className="flex flex-row bg-white p-5 justify-between rounded cursor-pointer">
      <div className="flex flex-col text-black gap-3">
        <p className="text-2xl font-bold">
          {" "}
          {item.title.length > maxChar
            ? `${item.title.slice(0, maxChar / 10)}...`
            : item.title}
        </p>
        <p className="text-sm">
          {item.description.length > maxChar
            ? `${item.description.slice(0, maxChar)}...`
            : item.description}
        </p>
      </div>
      <div className="flex flex-col text-black items-center gap-3">
        <p
          className={`text-sm px-2 py-1 rounded ${
            item.completed === true
              ? `bg-green-100 text-green-500`
              : `bg-red-100 text-red-500`
          }`}
        >
          {item.completed == true ? "Completed" : "Pending"}
        </p>
        <p className="text-gray-500">
          {new Date(item.updatedAt).toLocaleDateString("en-Gb")}
        </p>
      </div>
    </div>
  );
}
