"use client";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_TODOS } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export async function useListTodos({
  page,
  searchKey,
  completionStatus,
}: {
  page: number;
  searchKey: string;
  completionStatus: string;
}) {
  const data = await graphQLClient.request(GET_TODOS, {
    input: {
      page,
      pageSize: 8,
      query: {
        searchKey,
        completionStatus,
      },
    },
  });

  return data;
}
