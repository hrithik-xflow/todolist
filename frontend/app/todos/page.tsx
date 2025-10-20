import { graphQLClient } from "@/lib/graphql-client";
import { GET_TODOS } from "@/lib/queries";
import Link from "next/link";

export default async function Page(){

  const data = await graphQLClient.request(GET_TODOS);
  const tasks = data.listTodos;

    return (
        <div className=" flex flex-col bg-gray-100 items-center h-[85vh] ">
            <div className="w-[100%] p-10">
              <div className="flex flex-row justify-between pb-5">
              <p className="text-blue-500 text-2xl">Your Todos</p>
              <Link href={`/todos/create`} className="text-white bg-blue-500 rounded px-3 py-2 cursor-pointer">+ New Todo</Link>
              </div>
              {

                tasks.length==0?

              

              <div className="flex flex-col gap-3 text-black text-center text-xl justify-center h-[75vh]">
                <p>You have no tasks on board!</p>
                <p>Click on "+ New Todo" to create a new task.</p>
              </div>
:
            <div className="grid lg:grid-cols-2 gap-5 ">
                {
                  tasks.map(item=>{
                    return (
                      <Link href={`/todos/${item.id}`} key={item.id}>
                            <div className="flex flex-row bg-white p-5 justify-between rounded cursor-pointer">
                            <div className="flex flex-col text-black gap-3">
                                <p className="text-2xl font-bold">{item.title}</p>
                                <p className="text-sm">{item.description}</p>
                            </div>
                            <div className="flex flex-col text-black items-center gap-3">
                                <p className={`text-sm px-2 py-1 rounded ${item.completed===true?`bg-green-100 text-green-500`:`bg-red-100 text-red-500`}`}>{item.completed==true?"Completed":"Pending"}</p>
                                <p className="text-gray-500">{new Date(item.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                              </Link>
                        )  
                      })
                    }
            </div>
}
                    </div>
        </div>
    )
}