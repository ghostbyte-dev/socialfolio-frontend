"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import type { IUser } from "@/types/user-type";
import { Button } from "./Button";
import { FormInput } from "./inputs/FormInput";
import { FormTextarea } from "./inputs/FormTextarea";

export default function ProfileEditor({
  user,
  onClose,
}: {
  user: IUser;
  onClose: () => void;
}) {
  const params = useParams();
  const username = params.username as string;
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const schema = z.object({
    displayName: z
      .string()
      .trim()
      .min(1, "Display name cannot be empty")
      .max(50, "Display name is too long"),

    description: z
      .string()
      .max(160, "Description is too long")
      .optional()
      .or(z.literal("")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    watch,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      displayName: user.displayName ?? "",
      description: user.description ?? "",
    },
  });

  const handleUpdateSuccess = (updatedUser: IUser) => {
    // Update TanStack Query cache
    queryClient.setQueryData(["otheruser", username], updatedUser);

    // Reset the form with current watch values so dirtyFields clears
    reset({
      displayName: updatedUser.displayName,
      description: updatedUser.description,
    });
  };

  const updateName = useMutation({
    mutationFn: (name: string) =>
      UserService.updateDisplayName(name, token ?? ""),
    onSuccess: handleUpdateSuccess,
  });

  const updateDesc = useMutation({
    mutationFn: (desc: string) =>
      UserService.updateDescription(desc, token ?? ""),
    onSuccess: handleUpdateSuccess,
  });

  const displayName = watch("displayName");
  const description = watch("description");

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Edit profile</h2>

      <div>
        <FormInput
          label="Display name"
          type="text"
          placeholder="Your name"
          {...register("displayName")}
          error={errors.displayName?.message}
        />

        <Button
          label="Save name"
          size="sm"
          className="mt-2"
          disabled={!isValid || !dirtyFields.displayName}
          isLoading={updateName.isPending}
          onClick={() => updateName.mutate(displayName)}
        />
      </div>

      <div>
        <FormTextarea
          label="Description"
          placeholder="Something about you"
          {...register("description")}
          error={errors.description?.message}
        />

        <Button
          label="Save description"
          size="sm"
          className="mt-2"
          disabled={!isValid || !dirtyFields.description}
          isLoading={updateDesc.isPending}
          onClick={() => updateDesc.mutate(description ?? "")}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button label="Close" variant="neutral" onClick={onClose} />
      </div>
    </div>
  );
}
