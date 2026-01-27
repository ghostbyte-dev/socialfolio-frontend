import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import type { IUser } from "@/types/user-type";
import { Button } from "./Button";
import Popup from "./Popup";

export default function DisplayName({
  name,
  isOwner,
}: {
  name: string;
  isOwner: boolean;
}) {
  const params = useParams();
  const username = params.username as string;

  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const [editedName, setEditedName] = useState<string>(name);
  const { token } = useAuth();

  const handleOpenPopup = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const mutation = useMutation({
    mutationFn: (name: string) =>
      UserService.updateDisplayName(name, token ?? ""),
    onSuccess: (data: IUser) => {
      queryClient.setQueryData(["otheruser", username], data);
      handleClosePopup();
    },
  });

  const touchStyle =
    "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100";

  return (
    <div className="group relative">
      <h1 className="text-3xl font-bold mb-4 text-start break-words max-w-screen sm:max-w-none">
        {name}
      </h1>

      {isOwner && (
        <button
          type="button"
          aria-label="Edit display name"
          onClick={handleOpenPopup}
          className={`absolute top-[-10px] right-0 sm:right-[-40px] p-2 rounded-full bg-on-surface shadow-md scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
        >
          <PencilIcon size={18} className="text-surface" />
        </button>
      )}

      <Popup isOpen={isEditing} onClose={handleClosePopup} width="md">
        <h2 className="text-xl font-bold mb-4">Edit Display Name</h2>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="input bg-surface-container-high"
        />
        <div className="flex justify-end gap-2 mt-5">
          <Button label="Cancel" variant="neutral" onClick={handleClosePopup} />
          <Button
            label="Save"
            isLoading={mutation.isPending}
            onClick={() => mutation.mutate(editedName)}
          />
        </div>
      </Popup>
    </div>
  );
}
