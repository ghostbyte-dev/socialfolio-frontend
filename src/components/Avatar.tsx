import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user-type";
import { useParams } from "next/navigation";
import React from "react";
import { Point, Area } from "react-easy-crop";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import SubmitButton from "./SubmitButton";

export default function Avatar({
  url,
  isOwner,
}: {
  url: string;
  isOwner: boolean;
}) {
  const params = useParams();
  const username = params.username as string;
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const [file, setFile] = useState<string | undefined>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    url.trim() === "" ? "/defaults/default-avatar.jpg" : url
  );

  function handleChange(e: any) {
    setFile(URL.createObjectURL(e.target.files[0]));
    handleOpenPopup();
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOpenPopup = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    console.log("close");
    setFile(undefined);
    setIsEditing(false);
  };

  useEffect(() => {
    setAvatarUrl(url.trim() === "" ? "/defaults/default-avatar.jpg" : url);
  }, [url]);

  return (
    <div className="group relative">
      {isOwner ? (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
            accept="image/*"
            tabIndex={-1}
          />
          <div
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
            className="cursor-pointer group relative"
            tabIndex={0}
          >
            <Image
              src={file ?? avatarUrl}
              alt=""
              width={200}
              height={200}
              className="rounded-2xl min-h-48 min-w-48"
              priority
            />
            <div className="flex opacity-0 group-hover:opacity-100 group-focus:opacity-100 absolute top-0 bg-black/50 h-full w-full rounded-xl justify-center items-center duration-300 ease-in-out">
              <p className="text-white">Upload Avatar</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={avatarUrl}
            alt=""
            width={200}
            height={200}
            className="rounded-2xl"
            priority
          />
        </>
      )}

      {isEditing && file && (
        <CropAvatar
          imageUrl={file ?? ""}
          handleClosePopup={handleClosePopup}
          jwt={session?.user.jwt ?? ""}
          username={username}
        />
      )}
    </div>
  );
}

interface CropAvatarProps {
  imageUrl: string;
  handleClosePopup: () => void;
  jwt: string;
  username: string;
}

function CropAvatar({
  imageUrl,
  handleClosePopup,
  jwt,
  username,
}: CropAvatarProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const queryClient = useQueryClient();

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const saveImage = async () => {
    if (croppedAreaPixels) {
      const croppedImage: Blob = await getCroppedImg(
        imageUrl,
        croppedAreaPixels
      );
      uploadAvatar.mutate(croppedImage);
    }
  };

  const uploadAvatar = useMutation({
    mutationFn: (avatar: Blob) => UserService.uploadAvatar(avatar, jwt),
    onSuccess: (data: IUser, variables, context) => {
      console.log(data);
      queryClient.setQueryData(["otheruser", username], data);
      handleClosePopup();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface-container rounded-lg shadow-lg w-4/5 h-4/5 relative flex flex-col">
        <div className="relative h-full w-full overflow-hidden rounded-t-lg">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            showGrid={true}
            cropShape="rect"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex justify-end gap-2 bottom-0 p-6">
          <button
            onClick={handleClosePopup}
            className="button-outlined"
            disabled={uploadAvatar.isPending}
          >
            Cancel
          </button>
          <SubmitButton
            text="Save"
            isLoading={uploadAvatar.isPending}
            isFullWidth={false}
            onClick={saveImage}
          />
        </div>
      </div>
    </div>
  );
}
