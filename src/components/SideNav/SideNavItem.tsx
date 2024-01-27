import Link from "next/link";

export default function SideNavItem({ icon: Icon, name, route, router }) {
  const highlightCurrentItem =
    router.pathname == route
      ? "bg-blue-100 text-blue-400"
      : "bg-slate-200 hover:bg-slate-300 text-black";

  return (
    <Link href={route}>
      <div
        className={`relative flex items-center gap-2 pl-2 w-56 h-12 rounded-lg ${highlightCurrentItem}`}
      >
        <Icon size={25} />
        {name}
      </div>
    </Link>
  );
}
