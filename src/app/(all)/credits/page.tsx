import Link from "next/link";

export default function Credits() {
  return (
    <>
      <div className="">
        <section className="max-w-4xl w-4/5 mx-auto flex flex-col items-center my-[30vh]">
          <h1 className="text-5xl font-bold pb-7">Credits</h1>
          <div>
            <h2 className="font-bold text-2xl">Illustrations</h2>
            <p>The illustrations used on this website are provided by <Link href="https://storyset.com" className="font-bold hover:underline">Storyset</Link> and are licensed under their free plan.</p>
          </div>
        </section>
      </div>
    </>
  );
}
