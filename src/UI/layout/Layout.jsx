import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main style={{ padding: '1rem 0' }}>
                <Outlet />
            </main> 
        </div>

    );
};

export default Layout;