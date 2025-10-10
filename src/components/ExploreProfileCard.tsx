import { ExploreProfile } from "@/services/explore.service";
import Link from "next/link";

export default function ExploreProfileCard({
  profile,
}: {
  profile: ExploreProfile;
}) {
  return (
    <Link href={"/" + profile.username} className="h-full">
      <div
        key={profile.id}
        className="wrapper clickable p-4"
      >
        <div className="flex">
          <div className="min-w-28 min-h-24 mr-4">
            <img
              src={profile.avatar || "/defaults/default-avatar.jpg"}
              alt={profile.username}
              className="w-24 h-24 rounded-2xl"
            />
          </div>
          <div
            className="flex flex-col break-words"
            style={{ maxWidth: "calc(100% - 96px)" }}
          >
            <span>{profile.username}</span>
            <span className="text-xl font-semibold">
              {!profile.displayName ? profile.username : profile.displayName}
            </span>
          </div>
        </div>

        {profile.description && profile.description.length && (
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            {profile.description}
          </p>
        )}
      </div>
    </Link>
  );
}
