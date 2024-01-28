import HomeHeaderItem from "./HomeHeaderItem";

import { MdNumbers } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";
import { HomeHeaderProps } from "../../models/HomeProps";

export default function HomeHeader({
  numTasks,
  completedTasks,
  uncompletedTasks,
}: HomeHeaderProps) {
  return (
    <header className="flex justify-around">
      <HomeHeaderItem
        icon={MdNumbers}
        name="Number of Tasks"
        value={numTasks}
      />
      <HomeHeaderItem
        icon={FaCheckCircle}
        name="Tasks Completed"
        value={completedTasks}
      />
      <HomeHeaderItem
        icon={TbProgress}
        name="Tasks In Progress"
        value={uncompletedTasks}
      />
      <HomeHeaderItem icon={TbProgress} name="Number of Sub-tasks" value="" />
    </header>
  );
}
