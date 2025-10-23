import Image from "next/image";
import Link from "next/link";

export interface ExploreProfileButtonProps {
  username: string;
  image: string;
}

const ExploreProfileButton = ({
  username,
  image,
}: ExploreProfileButtonProps) => {
  return (
    <Link href={`/${username}`} className="rounded-full">
      <Image
        src={image}
        alt={`Profile image of ${username}`}
        height={72}
        width={72}
        className="rounded-full"
      />
    </Link>
  );
};

export default ExploreProfileButton;
