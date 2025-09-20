import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Footer } from "./footer";

export const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-[220px] min-h-screen">
                <main className="flex-1 p-4 bg-gray-50">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};
