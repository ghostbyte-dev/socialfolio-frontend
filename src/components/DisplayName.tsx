import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user-type";
import { useParams } from "next/navigation";

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
  const [editedName, setEditedName] = useState<string>(name)
  const { data: session } = useSession();

  const handleOpenPopup = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const mutation = useMutation({
    mutationFn: (name: string) =>
      UserService.updateDisplayName(name, session?.user.jwt ?? ""),
    onSuccess: (data: IUser, variables, context) => {
        console.log(username)
      queryClient.setQueryData(["otheruser", username], data);
      handleClosePopup();
    },
  });

  return (
    <div className="group relative">
      <h1 className="text-5xl font-bold mb-4">{name}</h1>

      {isOwner && (
        <button
          onClick={handleOpenPopup}
          className="absolute top-[-10px] right-[-10px] p-1 rounded-full opacity-0 bg-red-500 group-hover:opacity-100 hover:cursor-pointer"
        >
          <Image src="/icons/add.svg" alt="Edit icon" height={22} width={22} />
        </button>
      )}

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Display Name</h2>
            <input
              type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClosePopup}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => mutation.mutate(editedName)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
