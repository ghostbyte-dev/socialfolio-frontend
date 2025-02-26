import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-row flex-wrap p-6 items-start sm:items-center">
      <div className="basis-full h-full sm:basis-1/2 px-5 pt-10 sm:pb-10 justify-center max-h-62 sm:max-h-none">
        <img
          src="/other/socialfolio_widgets.png"
          alt=""
          className="object-contain h-full max-h-62 sm:max-h-none w-full"
        />
      </div>

      <div className="basis-full sm:basis-1/2 flex items-center px-5  md:px-10 lg:px-20 max-w-xl">
        {children}
      </div>
    </div>
  );
}
