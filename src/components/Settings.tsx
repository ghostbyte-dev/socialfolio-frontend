import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleQuestionMarkIcon, XIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import type { IUser, Status } from "@/types/user-type";
import { Button } from "./Button";
import SingleSelect from "./inputs/SingleSelect";

interface SettingsProps {
  user: IUser;
  onClose: () => void;
}

export default function Settings({ user, onClose }: SettingsProps) {
  const queryClient = useQueryClient();
  const { token, user: authUser } = useAuth();
  const username = authUser?.username;

  const [status, setStatus] = useState<Status>(user.status);
  const [isStatusInfoOpen, setIsStatusInfoOpen] = useState<boolean>();

  const statusOptions = [
    { value: "visible", label: "Visible" },
    { value: "hidden", label: "Hidden" },
    { value: "disabled", label: "Disabled" },
  ];

  const updateStatus = useMutation({
    mutationFn: (status: Status) =>
      toast.promise(UserService.updateStatus(status, token ?? ""), {
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
    <>
      <div className="flex flex-col overflow-y-scroll gap-4 mb-20">
        <h2 className="text-xl font-bold">Settings</h2>

        <form className="flex flex-col gap-2" onSubmit={handleSave}>
          <div className="flex flex-row gap-2">
            <SingleSelect
              label="Status"
              options={statusOptions}
              value={status}
              onValueChange={(val) => setStatus(val as Status)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsStatusInfoOpen(true);
              }}
              aria-label="Status explanation"
            >
              <CircleQuestionMarkIcon size={24} />
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button label="Cancel" onClick={onClose} variant="neutral" />
        <Button
          label="Save"
          isLoading={updateStatus.isPending}
          onClick={handleSave}
        />
      </div>
      {isStatusInfoOpen && (
        <StatusInfoDialog onClose={() => setIsStatusInfoOpen(false)} />
      )}
    </>
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
        <button
          type="button"
          onClick={onClose}
          className="top-4 right-4 absolute text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <XIcon size={18} />
        </button>
      </div>
    </div>
  );
}
