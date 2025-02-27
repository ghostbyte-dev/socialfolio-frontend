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
        className="bg-surface-container rounded-2xl h-full shadow-md p-4"
      >
        <div className="flex">
          <div>
            <img
              src={profile.avatar || "/defaults/default-avatar.jpg"}
              alt={profile.username}
              className="w-24 h-24 rounded-xl mr-4"
            />
          </div>
          <div className="flex flex-col">
            <span>{profile.username}</span>
            <span className="text-xl font-semibold">
              {!profile.displayName ? profile.username : profile.displayName}
            </span>
            <span>
              Joined: {new Date(profile.createdAt).toLocaleDateString()}
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
