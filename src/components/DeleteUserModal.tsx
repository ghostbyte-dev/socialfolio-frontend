import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FocusTrap } from "focus-trap-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteUserModalProps {
    onClose: () => void;
}

const DeleteUserModal = ({ onClose }: DeleteUserModalProps) => {
    const { token, logout } = useAuth();
    const queryClient = useQueryClient();
    const router = useRouter();
    const deleteUser = useMutation({
        mutationFn: () =>
            toast.promise(UserService.deleteUser(token ?? ""), {
                loading: "loading...",
                success: "Deleted account successfully",
                error: (err) => `Error: ${err.message}`,
            }),
        onSuccess: (variables, context) => {
            queryClient.clear();
            onClose();
            logout();
            router.push("/");
        },
    });

    return (
        <FocusTrap>
            <div
                className="fixed inset-0 bg-black/50 flex justify-center items-center"
                role="dialog"
                onClick={onClose}
                onKeyUp={(e) => (e.key === "Escape" ? onClose() : () => {})}
                tabIndex={-1}
            >
                <div
                    className="relative bg-surface-container rounded-2xl shadow-lg flex overflow-hidden flex-col p-8 gap-4"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    onKeyDown={() => {}}
                >
                    <h3 className="text-2xl font-bold">Are you shure?</h3>
                    <p>
                        Are you shure you want do delete your Account, this
                        action cannot be undone.
                    </p>
                    <div className="flex flex-row gap-4 w-full justify-end">
                        <button
                            type="button"
                            onClick={() => deleteUser.mutateAsync()}
                            className="button bg-red-800"
                        >
                            Delete
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="button-outlined"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
};

export default DeleteUserModal;
