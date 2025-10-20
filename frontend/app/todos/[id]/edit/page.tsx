'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type FormData = {
    id:String,
    title:string,
    description:string,
    completed:boolean,
    updatedAt:string
  }
  
  export default function Page(){
    
    
    
    let param = useParams();
    const id = param.id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const router = useRouter();


    const {register, handleSubmit,formState:{errors},reset} = useForm<FormData>({
        defaultValues:{
            id:id,
            title:title,
            description:description,
            completed:completed,
            updatedAt:updatedAt
    }});

useEffect(()=>{ 
  async function getData(){
    try{
      const data = await fetch(`http://localhost:3000/todos/${id}`).then(item=>item.json());
      if(!data)console.error("Id was not found");
      // console.log(data);
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
      setCreatedAt(new Date(data.createdAt).toLocaleString());

      setUpdatedAt(new Date(data.updatedAt).toLocaleString());

      reset(
        {
          title:data.title,
          description:data.description,
          completed:data.completed,
          updatedAt:data.updatedAt
        }
      )

      

    }
    catch(error){
      console.error("There is an error")
    }
  }
  getData();
},[])



    const onSubmit = async (data:FormData)=>{
        // tasks.map(item=>{
        //     if(item.id===Number(id)){
        //         item.title=data.title;
        //         item.completed=data.completed,
        //         item.description=data.description,
        //         item.updatedAt=data.updatedAt
        //         return;     
        //     }
        // })
        const url = `http://localhost:3000/todos/${id}`;
        const body={
          title:data.title,
          description:data.description,
          completed:completed
        }
        try {
          const res = await fetch(url,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
          });

          if(!res){
            throw new Error(`Could not update the Todo`);
          }
          const result = await res.json();
          console.log(result);
          router.push(`/todos/${id}`);
          
        } catch (error) {
          console.log(error);
        }

    }


    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className=" flex flex-col gap-5 bg-gray-100 w-max-[80%] h-max-[80%] m-5 border border-black rounded text-black p-5">

            <Link href={`/todos`} className="text-blue-500" >← Back to Todos</Link>
            <div className="bg-white items-center p-5">

            <div className="flex flex-col gap-5 rounded ">

            <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5 items-start w-[70%]">
                <input {...register('title',{required:'Title is required'})} className="font-bold text-3xl border rounded border-gray-500 w-[100%] px-2 py-1" />
                <div className="flex flex-row gap-2 justify-center">

                <p>Completion Status: </p>
                <button type="button" onClick={()=>setCompleted(!completed)} className={`text-sm px-2 py-1 rounded cursor-pointer ${completed===true?`bg-green-100 text-green-500`:`bg-red-100 text-red-500`}`}>{completed==true?"Completed":"Pending"}</button>
                </div>
            </div>

            </div>
  

            <div>
                <textarea {...register('description',{required:'Description is required'})} className="text-md border border-gray-500 rounded w-[70%]  text-left text-wrap px-2 py-1" />
            </div>
            </div>
            <button type="submit" className="text-white px-5 py-1 bg-blue-500 rounded px-2 cursor-pointer mt-5">Update</button>

            </div>
        </div>


            </form>
        </div>

    )


}