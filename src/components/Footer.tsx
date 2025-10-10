import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-surface-container flex justify-center py-20">

      
      <div className="grid grid-cols-5 container">
        <div>
          <h4 className="text-xl font-bold">Socialfolio</h4>
          <p>Fief fuuf</p>
        </div>

        <div className="">
          <h4 className="font-bold mb-3">Account</h4>
          <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
            <Link href="/auth/login" className="hover:text-white">
            Log in
          </Link>
          <Link href="/auth/register" className="hover:text-white">
            Sign up
          </Link>
          </nav>
        </div>

        <div className="">
          <h4 className="font-bold mb-3">Account</h4>
          <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
            <Link href="/auth/login" className="hover:text-white">
            Log in
          </Link>
          <Link href="/auth/register" className="hover:text-white">
            Sign up
          </Link>
          </nav>
        </div>

        <div className="">
          <h4 className="font-bold mb-3">Social</h4>
          <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
            <Link href="/auth/login" className="hover:text-white">
            Mastodon
          </Link>
          <Link href="/auth/register" className="hover:text-white">
            Github
          </Link>
          <Link href="/auth/register" className="hover:text-white">
            Socialfolio
          </Link>
          </nav>
        </div>

        <div className="">
          <h4 className="font-bold mb-3">Legal</h4>
          <nav className="text-slate-400 text-sm space-y-1 flex flex-col">
            <Link href="/imprint" className="hover:text-white">
            Imprint
          </Link>
          <Link href="/credits" className="hover:text-white">
            Credits
          </Link>
          </nav>
        </div>
      </div>
      
      </div>

      
      <div className="p-3 w-full flex justify-center items-center bg-primary text-on-primary">
        <div className="text-center text-sm">
          <Link href="https://ghostbyte.dev" className="font-bold hover:underline">
            A Ghostbyte Production
          </Link>{" "}
        </div>
      </div>
    </footer>
  );
}
