import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen text-black text-4xl">
      <CircularProgress />
    </div>
  );
}
