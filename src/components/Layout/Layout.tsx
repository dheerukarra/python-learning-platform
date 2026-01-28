import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
    return (
        <div className="app-layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <main className="page-container">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
