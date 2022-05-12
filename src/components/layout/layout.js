import "./layout.css";
import Sidebar from "../sidebar/sidebar";
import AdminSidebar from "../admin-sidebar/admin-sidebar";
import { useState, useEffect } from "react";
import Topbar from "../topbar/topbar";
import { useSelector, useDispatch } from "react-redux";
import { showSidemenu, hideSidemenu } from "../../redux/reducers/sidemenu";

const Layout = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const sidemenu = useSelector((state) => state.sidemenu);

  const setSidemenuWidth = () => {
    let width = "100%";

    if (sidemenu.show) {
      return width;
    } else {
      return undefined;
    }
  };

  return (
    <div className="layoutContainer">
      <div className="layoutHeader">
        <Topbar />
      </div>
      <div className="layoutSidebar">
        {user.admin ? <AdminSidebar /> : <Sidebar />}
      </div>
      {sidemenu.show && (
        <div className="layoutSidebarMobile">
          {user.admin ? (
            <AdminSidebar width={setSidemenuWidth} />
          ) : (
            <Sidebar width={setSidemenuWidth} />
          )}
        </div>
      )}

      <div className="layoutMain">{children}</div>
      <div className="layoutRight"></div>
    </div>
  );
};

export default Layout;
