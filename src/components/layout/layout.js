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

      <div className="layoutMain">{children}</div>
      <div className="layoutRight"></div>
    </div>
  );
};

export default Layout;
