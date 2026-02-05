import type { Metadata } from "next";
import UserClientPage from "@/components/UserClientPage";
import { UserService } from "@/services/user.service";
import { WidgetService } from "@/services/widget.service";
import type { MastodonData } from "@/types/widget-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  try {
    const user = await UserService.getUser(username, undefined, false);

    return {
      title: `${user.username} - Socialfolio`,
      description: `View ${user.username}'s Socialfolio profile with their connected Fediverse and social accounts.`,
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

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await UserService.getUser(username, undefined, false);
  const mastodonWidgets = await WidgetService.getMastodonWidgets(user.username);
  return (
    <>
      {mastodonWidgets.map((w) => {
        const data = w.data as MastodonData;
        const profileUrl = `${data.instance}/@${data.username}`;
        console.log(profileUrl);
        return <link key={w.id} rel="me" href={profileUrl} />;
      })}

      <UserClientPage />
    </>
  );
}
