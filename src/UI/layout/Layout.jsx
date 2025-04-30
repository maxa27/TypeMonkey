import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import "./styles.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Navigation />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
