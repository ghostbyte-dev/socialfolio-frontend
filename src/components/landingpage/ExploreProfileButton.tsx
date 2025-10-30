import { ArrowUpRight } from "lucide-react";
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
    <Link
      href={`/${username}`}
      className="relative group rounded-full w-[72px] h-[72px] block"
    >
      <Image
        src={image}
        alt={`Profile image of ${username}`}
        height={72}
        width={72}
        className="rounded-full object-cover transition duration-300 group-hover:blur-xs"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="bg-black/30 rounded-full w-full h-full flex items-center justify-center">
          <ArrowUpRight className="text-white w-6 h-6" />
        </div>
      </div>
    </Link>
  );
};

export default ExploreProfileButton;
