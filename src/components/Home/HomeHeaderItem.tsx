export default function HomeHeaderItem({ icon: Icon, name, value }) {
  return (
    <div className="relative flex flex-col w-52 h-28 rounded-lg bg-slate-50">
      <div className="flex items-center gap-2 pl-2 pt-2">
        <Icon />
        {name}
      </div>
      <div className="absolute bottom-0 pl-2 pb-2">{value}</div>
    </div>
  );
}
