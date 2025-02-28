import Link from "next/link";

export default function Footer() {
  return (
    <nav className="p-4 w-full flex justify-center items-center">
      <div className="text-center">
        Developed with 💙 by{" "}
        <Link href="/daniebeler" className="font-bold hover:underline">
          Daniel
        </Link>{" "}
        and{" "}
        <Link href="/hiebeler05" className="font-bold hover:underline">
          Emanuel
        </Link>
      </div>
    </nav>
  );
}
