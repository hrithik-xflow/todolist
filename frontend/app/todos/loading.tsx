import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen text-black text-4xl">
      <CircularProgress />
    </div>
  );
}
