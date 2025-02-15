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

export default function Avatar({
  url,
  isOwner,
}: {
  url: string;
  isOwner: boolean;
}) {
  const params = useParams();
  const username = params.username as string;
  const [isEditing, setIsEditing] = useState(true);
  const queryClient = useQueryClient();
  const [editedDescription, setEditedDescription] = useState<string>(url);
  const { data: session } = useSession();
  const [file, setFile] = useState<string>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleChange(e: any) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setIsEditing(true);
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file picker when avatar is clicked
    }
  };

  const handleOpenPopup = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const mutation = useMutation({
    mutationFn: (description: string) =>
      UserService.updateDescription(description, session?.user.jwt ?? ""),
    onSuccess: (data: IUser, variables, context) => {
      queryClient.setQueryData(["otheruser", username], data);
      handleClosePopup();
    },
  });

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
          />
          <div onClick={handleClick} className="cursor-pointer">
            <Image
              src={file ?? "/defaults/default-avatar.jpg"}
              alt=""
              width={200}
              height={200}
              className="rounded-2xl"
            />
          </div>
        </>
      ) : (
        <>
          <Image
            src={url ?? "/defaults/default-avatar.jpg"}
            alt=""
            width={200}
            height={200}
            className="rounded-2xl"
          />
        </>
      )}

      {/*isOwner && (
        <button
          onClick={handleOpenPopup}
          className="absolute top-[-10px] right-[-10px] p-2 rounded-full bg-black shadow-md scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:!scale-110"
        >
          <Image
            src="/icons/pencil-outline.svg"
            alt="Edit icon"
            height={18}
            width={18}
          />
        </button>
      )*/}

      {(isEditing && file)&& <CropAvatar imageUrl={file ?? ""} handleClosePopup={() => handleClosePopup} save={() => handleClosePopup} jwt={session?.user.jwt ?? ""}/>}
    </div>
  );
}

interface CropAvatarProps {
  imageUrl: string;
  handleClosePopup: () => {};
  save: () => {};
  jwt: string;
}

function CropAvatar({ imageUrl, handleClosePopup, save, jwt }: CropAvatarProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  };
  const saveImage = async () => {
    console.log("save")
    if (croppedAreaPixels) {
      const croppedImage: Blob = await getCroppedImg(imageUrl, croppedAreaPixels)
      await sendData(croppedImage)
    }
  }

  const sendData = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("avatar", blob);

    try {
      const response = await fetch("http://localhost:8000/api/user/uploadAvatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
      },
        body: formData,
      });
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 relative flex flex-col">
        <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          showGrid={true}
          cropShape="round"
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        </div>
        
      <div className="flex justify-end gap-2 bottom-0 p-6">
        <button
          onClick={handleClosePopup}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={saveImage}
        >
          Save
        </button>
      </div>
      </div>
    </div>
  );
}
