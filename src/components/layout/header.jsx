import { CTAs } from '../ui/header/cta';
import { Logo } from '../ui/header/logo';
import { NavBar } from '../ui/header/navbar';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">

                {/* Logo */}
                <Logo />

                {/* Navigation */}
                <NavBar />

                {/* Header CTAs */}
                <CTAs />

            </div>
        </header>
    );
};

export default Header;
