import Link from "next/link";

export default function Footer() {
  return (
    <nav className="p-4 w-full flex justify-center items-center">
      <div className="text-center">
        Developed with ❤️ by <Link href="/daniebeler">Daniel</Link> and{" "}
        <Link href="/hiebeler05">Emanuel</Link>
      </div>
    </nav>
  );
}
