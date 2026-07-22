import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Info,
  Calculator,
} from "lucide-react";

export const NavBarField = () => {

  const linkBaseClass =
    "flex items-center gap-3 px-2 py-2 rounded transition-colors whitespace-nowrap";

  return (
    <nav className="flex flex-col gap-2 mt-6 bg-white w-[100%]">
      <NavLink
        to="/field_work"
        end
        className={({ isActive }) =>
          `${linkBaseClass} ${
            isActive
              ? "nav-active"
              : "nav-inactive"
          }`
        }
      >
        <LayoutDashboard size={20} strokeWidth={1.8} />
        Dashboard
      </NavLink>

      <NavLink
        to="/field_work/input_data"
        className={({ isActive }) =>
          `${linkBaseClass} ${
            isActive
              ? "nav-active"
              : "nav-inactive"
          }`
        }
      >
        <Calculator size={20} strokeWidth={1.8} />
        Input Data
      </NavLink>

      <NavLink
        to="/field_work/about_us"
        className={({ isActive }) =>
          `${linkBaseClass} ${
            isActive
              ? "nav-active"
              : "nav-inactive"
          }`
        }
      >
        <Info size={20} strokeWidth={1.8} />
        About Us
      </NavLink>
    </nav>
  );
};
