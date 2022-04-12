import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Sidebar from '../../components/sidebar/sidebar'
import "./dashboard.css";


const Dashboard = () => {
    let { contextData } = useContext(AuthContext)

    return (
        <div>
            <Sidebar></Sidebar>

        </div>
    )
  
};

export default Dashboard;
