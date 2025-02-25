import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex p-6 items-center">
      <div className="w-[50%] px-5 py-10 h-full flex justify-center">
        <img src="/other/socialfolio_widgets.png" alt="" className="object-contain max-h-full" />
      </div>

      <div className="w-[50%] flex items-center"> 
        {children}
      </div>
    </div>
  );
}
