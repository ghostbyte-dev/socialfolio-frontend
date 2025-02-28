import Link from "next/link";

export default function Footer() {
  return (
    <nav className="bg-surface-container">
      <div className="p-4 flex justify-center">
        <Link href="/imprint" className="mx-3 font-bold hover:underline">
          Imprint
        </Link>
        <Link href="/credits" className="mx-3 font-bold hover:underline">
          Credits
        </Link>
      </div>
      <div className="p-4 w-full flex justify-center items-center">
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
      </div>
    </nav>
  );
}
