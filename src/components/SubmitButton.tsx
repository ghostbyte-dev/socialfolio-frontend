import LoadingSpinner from "@/assets/icons/loading-spinner.svg"

export default function SubmitButton({
  text,
  isDisabled = false,
  isLoading = false,
}: {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="disabled-button w-full flex justify-center">
        <LoadingSpinner className="w-[25px] h-[25px] animate-spin"/>
      </div>
    );
  }

  if (isDisabled) {
    return (
      <button disabled={true} type="submit" className="disabled-button w-full">
        {text}
      </button>
    );
  }
  return (
    <button type="submit" className="button w-full">
      {text}
    </button>
  );
}
