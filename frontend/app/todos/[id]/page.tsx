'use client'
import { graphQLClient } from "@/lib/graphql-client";
import { DELETE_TODOS } from "@/lib/queries";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Page(){


  let param = useParams();
   const id = param.id;
   const router = useRouter();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [completed, setCompleted] = useState(false);
const [createdAt, setCreatedAt] = useState("");
const [updatedAt, setUpdatedAt] = useState("");

useEffect(()=>{ 
  async function getData(){
    try{
      const data = await fetch(`http://localhost:3000/todos/${id}`).then(item=>item.json());
      if(!data)console.error("Id was not found");
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
      setCreatedAt(new Date(data.createdAt).toLocaleString());

      setUpdatedAt(new Date(data.updatedAt).toLocaleString());

    }
    catch(error){
      console.error("There is an error")
    }
  }
  getData();
},[])


  const deleteTodo = useMutation(
    {
      mutationFn:async(
        input:{
          id:number
        }
      )=>{
        const res = await graphQLClient.request(DELETE_TODOS,{input});
        return res;
      },
      onSuccess:()=>{
        router.push('/todos');
      },
      onError:()=>{
        console.log("There was an error while deleting the todo.");
      }
    }
  )

  const handleDelete=()=>{ 
    let choice = window.confirm(
      `Delete Task: "${title}"?`
    )
    if(!choice)return;
    deleteTodo.mutate({
      id:Number(id)
    })
  }




    return(

        <div className=" flex flex-col gap-5 bg-gray-100 w-max-[80%] h-max-[80%] m-5 border border-black rounded text-black p-5">

            <Link href={`/todos`} className="text-blue-500" >← Back to Todos</Link>
            <div className="flex flex-col gap-5 bg-white rounded p-5 ">
            <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2 items-start">
                <p className="font-bold text-3xl">{title}</p>
                <p className={`text-sm px-2 py-1 rounded ${completed===true?`bg-green-100 text-green-500`:`bg-red-100 text-red-500`}`}>{completed==true?"Completed":"Pending"}</p>
            </div>
            <div className="flex flex-row gap-2">

            <Link href={`/todos/${id}/edit`} className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer">Edit</Link>
            <p className="text-white px-5 py-1 bg-red-500 rounded px-2 cursor-pointer" onClick={handleDelete} >Delete</p>
            </div>
            </div>
  

            <div>
                <p className="text-md">{description}</p>
            </div>
            <hr />
              <div className="flex flex-row gap-10">
                <p className="text-sm text-gray-500">Created On: {createdAt}</p>
                <p className="text-sm text-gray-500">Last Updated: {updatedAt}</p>
            </div>
            </div>

        </div>
    )
}