import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Calculator, CircleStar } from 'lucide-react';

const Dropdown = () => {
    const linkBaseClass =
        'flex items-center gap-3 px-1 py-2 rounded transition-colors whitespace-nowrap';

    return (
        <nav className='mt-2'>
            <NavLink
                to="/results"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <LayoutDashboard size={20} strokeWidth={1.8} />
                Result
            </NavLink>

            <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <CircleStar size={20} strokeWidth={1.8} />
                Recommendations
            </NavLink>

            <NavLink
                to="/methodology"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-[#0e9486] text-white'
                        : 'text-[#0c7d72] hover:underline'
                    }`
                }
            >
                <LayoutDashboard size={20} strokeWidth={1.8} />
                Methodology
            </NavLink>

        </nav>
    );
};

export default Dropdown;
