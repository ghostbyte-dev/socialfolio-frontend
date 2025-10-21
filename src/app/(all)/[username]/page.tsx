import UserClientPage from "@/components/UserClientPage";
import { UserService } from "@/services/user.service";

export async function generateMetadata(
  { params }: { params: { username: string } },
) {
  const { username } = await params;

  try {
    const user = await UserService.getUser(username, undefined);

    return {
      title: `${user.username} - Socialfolio`,
      description:
        `View ${user.username}'s Socialfolio profile with their connected Fediverse and social accounts.`,
      openGraph: {
        title: `${user.username} - Socialfolio`,
        description: `Discover ${user.username}'s online presence.`,
        url: `https://socialfolio.me/${user.username}`,
        images: [user.avatar ?? "/default-avatar.png"],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${user.username} - Socialfolio`,
        description: `Explore ${user.username}'s Socialfolio profile.`,
        images: [user.avatar ?? "/default-avatar.png"],
      },
      alternates: {
        canonical: `https://socialfolio.me/${user.username}`,
      },
    };
  } catch {
    return {
      title: "User not found - Socialfolio",
      description: "This profile could not be found.",
    };
  }
}

export default function UserPage() {
  return <UserClientPage />;
}
