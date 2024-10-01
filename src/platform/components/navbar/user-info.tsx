import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface UserInfoProps {
  image: string;
  name: string;
  email: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ image, name, email }) => {
  // printear nombre del usuario e imagen del usuario
  return (
    <div className="avatar items-center gap-2">
      <div className="rounded-full w-20  h-20">
        <Image src={image} alt="user avatar" width={40} height={40} />
      </div>
      <div className="content-center">
        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="text-xs text-gray-500">{email}</div>
        </div>
        <Link
          href="/platform/account"
          className="inline-flex items-center mt-2"
        >
          account
          <FaExternalLinkAlt className="ml-2 text-xs text-gray-500" />
        </Link>
      </div>
      {/* add buton to go to account */}
    </div>
  );
};

export default UserInfo;
