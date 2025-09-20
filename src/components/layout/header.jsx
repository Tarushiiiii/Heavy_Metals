import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="m-3 flex justify-evenly border border-gray-400 p-2">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/calculator" className="hover:underline">Calculator</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/results" className="hover:underline">Results</Link>
            <Link to="/about" className="hover:underline">About</Link>
        </div>
    );
}

export default Header;