import LoadingSpinner from "@/assets/icons/loading-spinner.svg";

export default function LoadingIndicator() {
  return (
    <section className="p-4 w-full flex justify-center items-center">
      <LoadingSpinner className="w-[40px] h-[40px] animate-spin" />
    </section>
  );
}
