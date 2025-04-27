import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    );
};

export default Header;