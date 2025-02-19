export default function LoadingIndicator() {
  return (
    <section className="p-4 w-full flex justify-center items-center">
      <img className="animate-spin" src="/icons/loading-spinner.svg" width={40} height={40} />
    </section>
  );
}
