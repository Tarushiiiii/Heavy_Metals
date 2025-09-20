import { CTAs } from '../ui/header/cta';
import { Logo } from '../ui/header/logo';
import { NavBar } from '../ui/header/navbar';

const Sidebar = () => {
    return (
        <aside className="bg-white shadow-md h-screen w-[220px] flex flex-col justify-between p-4 fixed left-0 top-0">
            <div>
                <Logo />
                <NavBar />
            </div>
            <CTAs />
        </aside>
    );
};

export default Sidebar;
