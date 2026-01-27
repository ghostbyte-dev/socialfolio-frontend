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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense">
        <div className="hidden xl:block"></div>
        <div className="sm:mr-5 col-span-1 md:col-span-1">
          <Avatar url={user.avatar} isOwner={isOwner} />
        </div>

        <div className="flex items-start col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-2 flex-col mt-5 sm:mt-0 w-full sm:w-auto">
          <h1 className="text-3xl font-bold mb-4 text-start wrap-break-word max-w-screen sm:max-w-none">
            {user.displayName?.trim() ? user.displayName : user.username}
          </h1>

          {user.description.trim() && (
            <p className="text-xl wrap-break-word max-w-screen sm:max-w-none sm:px-0">
              {user.description}
            </p>
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
