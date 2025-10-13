import { useState } from "react";
import SubmitButton from "./SubmitButton";
import QuestionIcon from "@/assets/icons/question.svg";
import Close from "@/assets/icons/close.svg";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import type { IUser, Status } from "@/types/user-type";
import toast from "react-hot-toast";

interface SettingsProps {
  user: IUser;
  onClose: () => void;
}

export default function Settings({ user, onClose }: SettingsProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const jwt = session?.user?.jwt;
  const username = session?.user?.username;

  const [status, setStatus] = useState<Status>(user.status);
  const [isStatusInfoOpen, setIsStatusInfoOpen] = useState<boolean>();

  const updateStatus = useMutation({
    mutationFn: (status: Status) =>
      toast.promise(UserService.updateStatus(status, jwt ?? ""), {
        loading: "loading...",
        success: "Saved successfully",
        error: (err) => `Error: ${err.message}`,
      }),
    onSuccess: (data: IUser, variables, context) => {
      queryClient.setQueryData(["self"], data);
      queryClient.setQueryData(["otheruser", username], data);
      onClose();
    },
  });

  const handleSave = () => {
    updateStatus.mutate(status);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative bg-surface-container w-[80%] lg:w-[60%] lg:h-[80%] rounded-2xl shadow-lg flex overflow-hidden flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="basis-full flex flex-col overflow-y-scroll px-10 py-5 gap-4">
          <h2 className="text-xl font-bold">Settings</h2>

          <form className="flex flex-col gap-2" onSubmit={handleSave}>
            <label>Status</label>
            <div className="flex flex-row gap-2">
              <select
                name="status"
                id="status"
                className="input bg-surface-container-high"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="disabled">Disabled</option>
              </select>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsStatusInfoOpen(true);
                }}
                aria-label="Status explanation"
              >
                <QuestionIcon className="w-8 h-8" />
              </button>
            </div>
          </form>
        </div>
        <div className="bg-surface-container-high w-full rounded-b-2xl px-10 py-2 flex-row flex gap-2">
          <div className="basis-full"></div>
          <SubmitButton
            text="Cancel"
            onClick={onClose}
            isOutlined={true}
            isFullWidth={false}
          />
          <SubmitButton
            text="Save"
            isLoading={updateStatus.isPending}
            onClick={handleSave}
            isFullWidth={false}
          />
        </div>
        {isStatusInfoOpen && (
          <StatusInfoDialog onClose={() => setIsStatusInfoOpen(false)} />
        )}
      </div>
    </div>
  );
}

function StatusInfoDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative bg-surface-container-high rounded-2xl shadow-lg flex overflow-hidden flex-col px-10 py-5 max-w-[80%] md:max-w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold">Status Info</h3>

        <p>The status determines the visibility of your profile.</p>

        <strong>Visible:</strong>
        <p>
          Your profile is publicly accessible and will appear on the explore
          page.
        </p>

        <strong>Hidden:</strong>
        <p>
          Your profile will not appear on the explore page, but it can still be
          accessed directly via its URL.
        </p>

        <strong>Disabled:</strong>
        <p>
          Your profile is completely hidden from others. Only you can view it
          when logged in.
        </p>
        <div
          onClick={onClose}
          className="top-4 right-4 absolute text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <Close className="w-[10px] h-[10px]" />
        </div>
      </div>
    </div>
  );
}
