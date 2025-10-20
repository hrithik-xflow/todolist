import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex justify-center items-center h-screen text-black text-3xl flex flex-col gap-5">
            <p>
                This URL doesn't exist 😲
            </p>
            <div className="flex flex-rowtext-xl justify-center items-center gap-2">

            <p>Go back to your todo list here - </p>
            <Link href={`/todos`} className="bg-blue-500 px-2 py-1 rounded text-white">TodoList</Link>
            </div>
        </div>
    )
}