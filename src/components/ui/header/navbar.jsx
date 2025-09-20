import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (<nav className="flex gap-6">
        <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Dashboard
        </Link>
        <Link
            to="/data_entry"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Data Entry
        </Link>
        <Link
            to="/map"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Map
        </Link>
        <Link
            to="/reports"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Reports
        </Link>
        <Link
            to="/public_info"
            className="text-gray-600 hover:text-blue-600 transition-colors"
        >
            Public Info
        </Link>
    </nav>);
}