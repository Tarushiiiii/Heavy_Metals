import { Bell, User2 } from "lucide-react";
import './layout.css';

export const Header = ({ userName, children }) => {
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
            </div>
        </div>
    );
};
