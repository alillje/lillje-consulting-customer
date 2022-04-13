import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import "./dashboard.css";
import Sidebar from "../../components/sidebar/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../../services/logout-service";
import { logout } from "../../reducers/user";

const Dashboard = () => {
  // let { contextData } = useContext(AuthContext)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutHandler(user);
    localStorage.removeItem("lc_ab_mb_token");
    dispatch(logout());
    // Remove refresh token from database here
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <h1>Welcome, {user.user.username}</h1>
      <div className="logoutDiv" onClick={handleLogout}>
        Logga ut
      </div>
    </div>
  );
};

export default Dashboard;
