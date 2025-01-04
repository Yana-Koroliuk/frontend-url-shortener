import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, isAuthenticated, onLogout }) => (
    <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
    </div>
);

export default Layout;
