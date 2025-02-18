import { ExploreProfile } from "@/services/explore.service";
import Link from "next/link";

export default function ExploreProfileCard({
  profile,
}: {
  profile: ExploreProfile;
}) {
  return (
    <Link href={"/" + profile.username}>
      <div
        key={profile.id}
        className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center"
      >
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt={profile.username}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{profile.username}</h2>
        <p className="text-gray-500 dark:text-gray-400">{profile.bio}</p>
      </div>
    </Link>
  );
}
