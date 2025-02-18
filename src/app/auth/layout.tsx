import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-h-screen flex p-6">

      <div className="w-[50%]">
        <img src="/other/fief.jpg" alt="" className="object-cover h-full w-full rounded-2xl" />
      </div>

      <div className="w-[50%] flex justify-center items-center"> 
        {children}
      </div>


      
    </div>
  );
}
