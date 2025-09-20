import { Bell, User2 } from "lucide-react";

export const Header = () => {
    return (
        <div className="sticky top-0 flex justify-end items-center gap-x-6 px-4 py-2 bg-white shadow">
            <div
                className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900"
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
                className="flex flex-col items-center gap-1 cursor-pointer hover:text-gray-900"
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
    );
};
