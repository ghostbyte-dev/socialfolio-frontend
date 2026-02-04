"use client";

import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import type { IUser } from "@/types/user-type";
import Avatar from "./Avatar";
import { Button } from "./Button";
import Popup from "./Popup";
import ProfileEditor from "./ProfileEditor";

export default function Bio({
  isOwner,
  user,
}: {
  isOwner: boolean;
  user: IUser;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-40 md:max-w-56">
          <Avatar url={user.avatar} isOwner={isOwner} />
        </div>

        <h1 className="text-2xl md:text-4xl mt-5 text-center font-bold mb-4 wrap-break-word max-w-screen sm:max-w-none">
          {user.displayName?.trim() ? user.displayName : user.username}
        </h1>

        {user.description.trim() && (
          <p className="text-lg md:text-xl text-center wrap-break-word max-w-3xl">
            {user.description}
          </p>
        )}
        {user.views && (
          <div className="text-sm mt-2">{user.views} profile views</div>
        )}

        {isOwner && (
          <Button
            label="Edit profile"
            onClick={() => setIsEditing(true)}
            size="sm"
            className="mt-5"
            icon={SettingsIcon}
          />
        )}
      </div>
      {user && (
        <Popup
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          width="lg"
        >
          <ProfileEditor user={user} onClose={() => setIsEditing(false)} />
        </Popup>
      )}
    </>
  );
}
