import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, isAuthenticated, onLogout }) => (
    <>
        <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />
        <main className="p-4">{children}</main>
        <Footer />
    </>
);

export default Layout;
