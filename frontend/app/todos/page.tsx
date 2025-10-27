import PageWrapper from "@/components/PageWrapper";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_TODOS } from "@/lib/queries";
import Pagination from "@mui/material/Pagination";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Loading from "./loading";

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string; filter?: string; page?: number };
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");
  // console.log(session);

  const token = session?.user?.accessToken;

  if (!token) {
    console.error("No JWT Token found.");
    throw new Error("Unauthorized");
  }

  // console.log(session.user);

  const params = await searchParams;

  const page = params.page ? Number(params.page) : 1;
  const search = params.search ?? "";
  const filter = params.filter ?? "all";

  const gqc = graphQLClient(token);

  const data = await gqc.request(GET_TODOS, {
    input: {
      page: page,
      pageSize: 6,
      query: {
        searchKey: search,
        completionStatus: filter,
      },
    },
  });

  return <PageWrapper tasks={data.listTodos} />;
}
