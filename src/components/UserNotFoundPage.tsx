import Link from "next/link";
import Button from "./Button";

export default function UserNotFoundPage() {
  return (
    <section className="p-4 w-full flex flex-col justify-center items-center text-center">
      <img src="/illustrations/404.svg" className="w-full max-w-xl mx-auto" alt="404 Illustration" />
        <p className="mt-8 mb-5 text-2xl font-bold">This user does not exist</p>
        <Button link="/">
          Go Back Home
        </Button>
 
    </section>
  );
}
