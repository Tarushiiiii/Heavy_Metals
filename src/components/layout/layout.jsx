import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-[220px] min-h-screen">
                <main className="flex-1 p-4 bg-gray-50">
                    <header className="bg-white shadow-md">
                        <Header />
                    </header>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};
