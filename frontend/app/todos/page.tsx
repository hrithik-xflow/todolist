import PageWrapper from "@/components/PageWrapper";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_TODOS } from "@/lib/queries";
import Pagination from "@mui/material/Pagination";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string; filter?: string; page?: number };
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  console.log(session.user);

  const params = await searchParams;

  const page = params.page ? Number(params.page) : 1;
  const search = params.search ?? "";
  const filter = params.filter ?? "all";

  const data = await graphQLClient.request(GET_TODOS, {
    input: {
      page: page,
      pageSize: 2,
      query: {
        searchKey: search,
        completionStatus: filter,
      },
    },
  });

  return <PageWrapper tasks={data.listTodos} />;
}
