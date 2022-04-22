import "./layout.css";
import Sidebar from "../sidebar/sidebar";
import Topbar from "../topbar/topbar";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layoutContainer">
      <div className="layoutHeader">
        <Topbar />
      </div>
      <div className="layoutSidebar">
        <Sidebar />
      </div>

      <main>{children}</main>
      <div className="layoutRight"></div>
    </div>
  );
};

export default Layout;
