import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TaskIdAction from "@/components/TaskIdAction";
import TaskIdComponent from "@/components/TaskIdComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const session = await getServerSession(authOptions);
  // console.log(session?.user);
  if (!session) redirect("/api/auth/signin");

  const { id } = await params;
  return (
    <div className=" flex flex-col gap-5 bg-gray-100 w-max-[80%] h-max-[80%] m-5 border border-black rounded text-black p-5">
      <TaskIdAction id={id} />
      <TaskIdComponent id={id} />
    </div>
  );
}
