'use client'
import { graphQLClient } from "@/lib/graphql-client";
import { GET_TODOS } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export function useListTodos(){
    return useQuery(
        {
            queryKey:['listTodos'],
            queryFn: async()=>{
                const data = await graphQLClient.request(GET_TODOS);
                return data.listTodos;
            }
        }
    );
}