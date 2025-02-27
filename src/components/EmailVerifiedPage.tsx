import Button from "./Button";

export default function EmailVerifiedPage() {
  return (
    <section className="p-4 w-full flex flex-col justify-center items-center text-center">
      <img
        src="/illustrations/email-verified.svg"
        className="w-full max-w-xl mx-auto"
        alt="404 Illustration"
      />
      <p className="mt-8 mb-5 text-2xl font-bold">Email verified</p>
    </section>
  );
}
