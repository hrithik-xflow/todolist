"use client";
import { graphQLClient } from "@/lib/graphql-client";
import { CREATE_TODOS } from "@/lib/queries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export const useCreateTodoMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (input: {
      title: string;
      description: string;
      completed: boolean;
    }) => {
      const res = await graphQLClient.request(CREATE_TODOS, { input });
      return res;
    },
    onSuccess: () => {
      router.push(`/todos`);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
// const router = useRouter();
// export const useCreateTodo = useMutation({
//     mutationFn:async(input:{
//         title:string
//         description:string,
//         completed:boolean
//                 })=>{
//                     const res = await graphQLClient.request(CREATE_TODOS,{input});
//                     return res;
//                 },
//                 onSuccess:()=>{

//                     router.push(`/todos`);
//                 },
//                 onError:(error)=>{
//                     console.error(error);
//                 }

//     });
