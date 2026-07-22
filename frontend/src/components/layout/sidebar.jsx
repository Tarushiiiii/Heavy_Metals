import { Logo } from "../ui/sidebar/logo";
import { NavBar } from "../ui/sidebar/navbar";

const Sidebar = () => {

  return (
    <aside className="bg-white shadow-md h-screen w-[18%] flex flex-col justify-between p-4 fixed left-0 top-0">
      <div>
        <Logo color="#225ca3" />
        <NavBar />
      </div>
    </aside>
  );
};

export default Sidebar;
