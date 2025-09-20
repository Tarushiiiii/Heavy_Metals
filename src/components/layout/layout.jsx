import { Outlet } from "react-router-dom";
import Header from "./header";
import { Footer } from "./footer";

export const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}