import "./layout.css";
import Sidebar from "../../components/sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../../services/logout-service";
import { logout } from "../../redux/reducers/user";

const Layout = ({children}) => {

  return (
    <div>
      <Sidebar></Sidebar>
        <main>{children}</main>
    </div>
  );
};

export default Layout;
