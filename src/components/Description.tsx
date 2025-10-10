import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { useSession } from "next-auth/react";
import type { IUser } from "@/types/user-type";
import { useParams } from "next/navigation";
import Pencil from "@/assets/icons/pencil-outline.svg";
import { FocusTrap } from "focus-trap-react";

export default function Description({
  description,
  isOwner,
}: {
  description: string;
  isOwner: boolean;
}) {
  const params = useParams();
  const username = params.username as string;

  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const [editedDescription, setEditedDescription] =
    useState<string>(description);
  const { data: session } = useSession();

  const handleOpenPopup = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const mutation = useMutation({
    mutationFn: (description: string) =>
      UserService.updateDescription(description, session?.user?.jwt ?? ""),
    onSuccess: (data: IUser, variables, context) => {
      queryClient.setQueryData(["otheruser", username], data);
      handleClosePopup();
    },
  });

  const touchStyle =
    "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100";

  return (
    <div className="group relative">
      {description.trim() && (
        <p className="text-xl break-words max-w-screen sm:max-w-none sm:px-0">
          {description}
        </p>
      )}

      {!description.trim() && isOwner && (
        <div className="">Add description...</div>
      )}

      {isOwner && (
        <button
          type="button"
          aria-label="Edit profile description"
          onClick={handleOpenPopup}
          className={`absolute top-[-10px] right-0 sm:right-[-40px] p-2 rounded-full bg-on-surface shadow-md scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
        >
          <Pencil className="w-[18px] h-[18px] text-surface" />
        </button>
      )}

      {isEditing && (
        <FocusTrap>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-surface-container p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit description</h2>
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="input w-full bg-surface-container-high"
                placeholder="Desription..."
              />
              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="button-outlined"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => mutation.mutate(editedDescription)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
