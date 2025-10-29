import { getServerSession } from "next-auth";
import NotFound from "./NotFound";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function TaskIdComponent({ id }: { id: number }) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("There is an error");
      return res.json();
    })
    .catch((error) => console.log(error));

  if (!data) return <NotFound />;

  return (
    <div className="flex flex-col gap-5 bg-white rounded p-5 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-start">
          <p className="font-bold text-xl sm:text-2xl md:text-3xl">
            {data.title}
          </p>
          <p
            className={`text-xs px-2 py-1 rounded ${
              data.completed === true
                ? `bg-green-100 text-green-500`
                : `bg-red-100 text-red-500`
            }`}
          >
            {data.completed == true ? "Completed" : "Pending"}
          </p>
        </div>
      </div>

      <div>
        <textarea
          value={data.description}
          readOnly
          className="w-[100%] h-[55vh] resize-none overflow-y-auto p-5 border border-gray-200 rounded text-xs sm:text-sm md:text-md lg:text-lg"
        ></textarea>
      </div>
      <hr />
      <div className="flex flex-row gap-10">
        <p className="text-xs sm:text-sm text-gray-500">
          Created On: {new Date(data.createdAt).toLocaleString()}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Last Updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default TaskIdComponent;
