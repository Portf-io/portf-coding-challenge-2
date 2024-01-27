import HomeHeaderItem from "./HomeHeaderItem";

import { MdNumbers } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";

export default function HomeHeader() {
  return (
    <header className="flex justify-around">
      <HomeHeaderItem
        icon={MdNumbers}
        name="Number of Tasks"
        calc_function=""
      />
      <HomeHeaderItem
        icon={FaCheckCircle}
        name="Tasks Completed"
        calc_function=""
      />
      <HomeHeaderItem
        icon={TbProgress}
        name="Tasks In Process"
        calc_function=""
      />
      <HomeHeaderItem
        icon={TbProgress}
        name="Number of Sub-tasks"
        calc_function=""
      />
    </header>
  );
}
