import LoadingSpinner from "@/assets/icons/loading-spinner.svg";

export default function SubmitButton({
  text,
  isDisabled = false,
  isLoading = false,
  isOutlined = false,
  isFullWidth = true,
  onClick = () => {},
}: {
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
}) {
  const buttonClass = isOutlined ? "button-outlined" : "button";

  if (isLoading) {
    return (
      <div
        className={`disabled-${buttonClass} ${
          isFullWidth ? "w-full flex justify-center" : ""
        }`}
      >
        <LoadingSpinner className="w-[25px] h-[25px] animate-spin" />
      </div>
    );
  }

  if (isDisabled) {
    return (
      <button
        disabled={true}
        type="submit"
        className={`disabled-${buttonClass} ${isFullWidth ? "w-full" : ""}`}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      type="submit"
      className={`${buttonClass} ${isFullWidth ? "w-full" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
