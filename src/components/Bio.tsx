import type { IUser } from "@/types/user-type";
import Avatar from "./Avatar";
import Description from "./Description";
import DisplayName from "./DisplayName";

export default function Bio({
  isOwner,
  user,
}: {
  isOwner: boolean;
  user: IUser;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense">
      <div className="hidden xl:block"></div>
      <div className="sm:mr-5 col-span-1 md:col-span-1">
        <Avatar url={user.avatar} isOwner={isOwner} />
      </div>

      <div className="flex col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-2 flex-col mt-5 sm:mt-0 w-full sm:w-auto">
        <DisplayName
          name={user.displayName?.trim() ? user.displayName : user.username}
          isOwner={isOwner}
        />

        <Description description={user.description} isOwner={isOwner} />
      </div>
    </div>
  );
}
