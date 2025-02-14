import Avatar from "./Avatar";
import DisplayName from "./DisplayName";
import Description from "./Description";
import { IUser } from "@/types/user-type";

export default function Bio({
  isOwner,
  user,
}: {
  isOwner: boolean;
  user: IUser;
}) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <div className="mr-5">
        <Avatar url={user.avatar} isOwner={isOwner} />
      </div>

      <div className="flex flex-col items-start justify-center">
        <DisplayName
          name={user.displayName?.trim() ? user.displayName : user.username}
          isOwner={isOwner}
        />

        <Description description={user.description} isOwner={isOwner} />
      </div>
    </div>
  );
}
