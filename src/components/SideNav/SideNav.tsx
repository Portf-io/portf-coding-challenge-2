import Link from "next/link";
import { useRouter } from "next/router";

import Image from "next/image";
import PortFLogo from "../../../public/logo.svg";

import SideNavItem from "./SideNavItem";
import { AiOutlineHome } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";

export default function SideNav() {
  const router = useRouter();

  return (
    <div className="relative bg-slate-50 flex flex-col items-center space-y-2 h-full">
      <div className="pt-6">
        <div className="relative bg-blue-300 w-56 h-36 rounded-lg pt-6">
          <Link href="/">
            <Image
              className="absolute bottom-0 left-0"
              src={PortFLogo}
              alt="PortF Logo"
              width={150}
            />
          </Link>
        </div>
      </div>
      <SideNavItem icon={AiOutlineHome} name="Home" route="/" router={router} />
      <SideNavItem icon={FiInfo} name="Info" route="/info" router={router} />
      <div className="absolute bottom-0 pb-6">
        <SideNavItem
          icon={VscSignOut}
          name="Sign Out"
          route="/signout"
          router={router}
        />
      </div>
    </div>
  );
}
