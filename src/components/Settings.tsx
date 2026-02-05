import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InfoIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import type { IUser, Status } from "@/types/user-type";
import { Button } from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import SingleSelect from "./inputs/SingleSelect";

interface SettingsProps {
  user: IUser;
  onClose: () => void;
}

export default function Settings({ user, onClose }: SettingsProps) {
  const queryClient = useQueryClient();
  const { token, user: authUser, logout } = useAuth();

  const router = useRouter();

  const username = authUser?.username;

  const [status, setStatus] = useState<Status>(user.status);
  const [accountDeletionPopup, setAccountDeletionPopup] =
    useState<boolean>(false);

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

  const deleteUser = useMutation({
    mutationFn: () =>
      toast.promise(UserService.deleteUser(token ?? ""), {
        loading: "loading...",
        success: "Deleted account successfully",
        error: (err) => `Error: ${err.message}`,
      }),
    onSuccess: (variables, context) => {
      queryClient.clear();
      setAccountDeletionPopup(false);
      logout();
      router.push("/");
    },
  });

  const handleSave = () => {
    updateStatus.mutate(status);
  };

  return (
    <>
      <div className="flex flex-col overflow-y-scroll gap-4 mb-20">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Settings</h2>

          <button
            type="button"
            aria-label="Close widget creator"
            onClick={onClose}
            className="z-30 text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
          >
            <XIcon size={18} />
          </button>
        </div>

        <form className="mt-5" onSubmit={handleSave}>
          <div className=" gap-2">
            <SingleSelect
              label="Status"
              options={statusOptions}
              value={status}
              onValueChange={(val) => setStatus(val as Status)}
              className="flex-1"
            />
            <div className="p-3 border border-blue-500 bg-blue-500/10 rounded-xl mt-3">
              <div className="flex items-center space-x-2 mb-2 text-blue-500">
                <InfoIcon size={18} />
                <h3 className="text-xl font-bold">Status</h3>
              </div>

              <p className="text-sm">
                The status determines the visibility of your profile.
              </p>

              <p className="mt-3 text-blue-500 font-bold">Visible:</p>
              <p className="text-sm">
                Your profile is publicly accessible and will appear on the
                explore page.
              </p>

              <p className="mt-3 text-blue-500 font-bold">Hidden:</p>
              <p className="text-sm">
                Your profile will not appear on the explore page, but it can
                still be accessed directly via its URL.
              </p>

              <p className="mt-3 text-blue-500 font-bold">Disabled:</p>
              <p className="text-sm">
                Your profile is completely hidden from others. Only you can view
                it when logged in.
              </p>
            </div>
          </div>
        </form>

        <Button
          label="Delete Account"
          onClick={() => setAccountDeletionPopup(true)}
          className="mt-8"
          variant="danger"
        />
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button label="Cancel" onClick={onClose} variant="neutral" />
        <Button
          label="Save"
          isLoading={updateStatus.isPending}
          onClick={handleSave}
        />
      </div>

      <ConfirmationModal
        isOpen={accountDeletionPopup && user !== null}
        onClose={() => setAccountDeletionPopup(false)}
        actionVariant="danger"
        title="Delete account"
        description={`Are you sure you want to delete your account.`}
        action={() => deleteUser.mutateAsync()}
        actionLabel="Delete"
      />
    </>
  );
}
