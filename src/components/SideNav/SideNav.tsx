import Link from "next/link";

import Image from "next/image";
import PortFLogo from "../../../public/logo.svg";

export default function SideNav() {
  return (
    <div className="relative bg-slate-50 flex flex-col items-center space-y-2 h-full">
      <div className="pt-6">
        <div className="relative bg-blue-200 w-56 h-36 rounded-lg pt-6">
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
      <div className="relative bg-slate-200 w-56 h-12 rounded-lg">Home</div>
      <div className="relative bg-slate-200 w-56 h-12 rounded-lg">Help</div>
      <div className="absolute bottom-0 pb-6">
        <div className="relative bg-slate-200 w-56 h-12 rounded-lg pt-6">
          Sign out
        </div>
      </div>
    </div>
  );
}
