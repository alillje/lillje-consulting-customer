import "./dashboard.css";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardContent from "../../components/dashboard-content/dashboard-content"



const Dashboard = () => {
  return (
<DashboardContent />
  );
}
;

export default Dashboard;
