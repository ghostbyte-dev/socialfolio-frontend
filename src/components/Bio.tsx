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
    <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start">
      <div className="sm:mr-5">
        <Avatar url={user.avatar} isOwner={isOwner} />
      </div>

      <div className="flex flex-col items-center sm:items-start justify-center mt-5 sm:mt-0 w-full sm:w-auto">
        <DisplayName
          name={user.displayName?.trim() ? user.displayName : user.username}
          isOwner={isOwner}
        />

        <Description description={user.description} isOwner={isOwner} />
      </div>
    </div>
  );
}
