import "./layout.css";
import Sidebar from "../sidebar/sidebar";
import AdminSidebar from "../admin-sidebar/admin-sidebar";

import Topbar from "../topbar/topbar";
import { useSelector } from "react-redux";


const Layout = (props) => {
  const { children } = props;
  const user = useSelector((state) => state.user);


  return (
    <div className="layoutContainer">
      <div className="layoutHeader">
        <Topbar />
      </div>
      <div className="layoutSidebar">
        {user.admin ? <AdminSidebar /> : <Sidebar />}
      </div>

      <div className="layoutMain">{children}</div>
      <div className="layoutRight"></div>
    </div>
  );
};

export default Layout;
