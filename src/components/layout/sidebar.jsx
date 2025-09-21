import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
// import { CTAs } from '../ui/sidebar/cta';
import { Logo } from '../ui/sidebar/logo';
import { NavBar } from '../ui/sidebar/navbar';
import { Settings } from 'lucide-react';

const Sidebar = () => {
    const linkBaseClass = 'flex items-center justify-center gap-3 px-4 py-2 rounded transition-colors whitespace-nowrap';

    return (
        <aside className="bg-white shadow-md h-screen w-[220px] flex flex-col justify-between p-4 fixed left-0 top-0">
            <div>
                <Logo />
                <NavBar />
            </div>
            {/* <CTAs /> */}
            {/* <Button type="main" colorVariant="secondary">
                Settings
            </Button> */}
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `${linkBaseClass} ${isActive
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-800 border border-gray-800 hover:underline'
                    }`
                }
            >
                <Settings size={20} strokeWidth={1.8} />
                Settings
            </NavLink>
        </aside>
    );
};

export default Sidebar;
