export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div>

            <div className="w-[100%] py-5 flex flex-row justify-between px-10 border border-b bg-white">
                <p className="text-2xl font-bold font-mono text-blue-500" >Todo List</p>
                <p className="text-lg font-mono text-blue-500">Login</p>
            </div>
        {children}
</div>

  );
}