import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TextCursorInput, ChartArea, Map, BarChart2, Info } from 'lucide-react';

export const NavBar = () => {
    const linkBaseClass =
        'flex items-center gap-3 px-4 py-2 rounded transition-colors whitespace-nowrap';

    return (
        <nav className="flex flex-col gap-2 mt-6 bg-white">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <LayoutDashboard size={20} strokeWidth={1.8} />
                Dashboard
            </NavLink>
            <NavLink
                to="/data_entry"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <TextCursorInput size={20} strokeWidth={1.8} />
                Data Entry
            </NavLink>
            <NavLink
                to="/map"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <Map size={20} strokeWidth={1.8} />
                Map
            </NavLink>
            <NavLink
                to="/reports"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <BarChart2 size={20} strokeWidth={1.8} />
                Reports
            </NavLink>
            <NavLink
                to="/public_info"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <Info size={20} strokeWidth={1.8} />
                Public Info
            </NavLink>
        </nav>
    );
};
