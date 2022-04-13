import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Sidebar from '../../components/sidebar/sidebar'
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../reducers/user'
import "./dashboard.css";


const Dashboard = () => {
    // let { contextData } = useContext(AuthContext)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('lc_ab_mb_token')
        dispatch(logout())
        // Remove refresh token from database here

    }

    return (
        <div>
            <Sidebar></Sidebar>
                <h1>Welcome, {user.username}</h1>
                <div className="logoutDiv" onClick={handleLogout}>Logga ut</div>
        </div>
    )
  
};

export default Dashboard;
