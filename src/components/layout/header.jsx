import { NavLink } from 'react-router-dom';
import { Bell, User2, Settings } from "lucide-react";
import './layout.css';

export const Header = ({ userName, children }) => {
    const linkBaseClass = 'flex items-center justify-center gap-3 px-4 py-2 rounded transition-colors whitespace-nowrap';

    return (
        <div className="header-container">
            <div className="header-left">
                <div className="header-head">
                    {children === "Dashboard" && children}
                </div>
                <div className="header-item">
                    Welcome {userName}!
                </div>
            </div>
            <div className="header-right">
                <div
                    className="header-item"
                    role="button"
                    tabIndex={0}
                    aria-label="Notifications"
                    onClick={() => alert("Notifications clicked")} // optional handler
                    onKeyDown={(e) => { if (e.key === 'Enter') alert("Notifications clicked") }}
                >
                    <Bell size={20} />
                    <span className="text-xs select-none">Notification</span>
                </div>

                <div
                    className="header-item"
                    role="button"
                    tabIndex={0}
                    aria-label="User Profile"
                    onClick={() => alert("Profile clicked")} // optional handler
                    onKeyDown={(e) => { if (e.key === 'Enter') alert("Profile clicked") }}
                >
                    <User2 size={20} />
                    <span className="text-xs select-none">Profile</span>
                </div>
                {/* <NavLink
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
                </NavLink> */}
            </div>
        </div>
    );
};
