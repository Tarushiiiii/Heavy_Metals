import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (<nav className="flex gap-6">
        <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Home
        </Link>
        <Link
            to="/calculator"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Calculator
        </Link>
        <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Dashboard
        </Link>
        <Link
            to="/results"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Results
        </Link>
        <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            About
        </Link>
    </nav>);
}