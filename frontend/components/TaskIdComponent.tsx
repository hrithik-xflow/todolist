import NotFound from "./NotFound";

async function TaskIdComponent({ id }: { id: number }) {
  const data = await fetch(`http://localhost:3000/todos/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("There is an error");
      return res.json();
    })
    .catch((error) => console.log(error));

  if (!data) return <NotFound />;

  return (
    <div className="flex flex-col gap-5 bg-white rounded p-5 ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2 items-start">
          <p className="font-bold text-3xl">{data.title}</p>
          <p
            className={`text-sm px-2 py-1 rounded ${
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
          className="w-[100%] h-[55vh] resize-none overflow-y-auto p-5 border border-gray-200 rounded"
        ></textarea>
      </div>
      <hr />
      <div className="flex flex-row gap-10">
        <p className="text-sm text-gray-500">
          Created On: {new Date(data.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Last Updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default TaskIdComponent;
