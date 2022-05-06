import "./dashboard.css";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Dashboard = () => {
  const admin = useSelector((state) => state.user.admin);

  return admin ? <div>Admin</div> : (
    <div className="dashboardContainer">
      <div className="div1">
      <Link to="/transactions/register">

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{color: '#ffffff'}}>
          Registrera transaktion
        </Typography>

      </CardContent>
      <CardActions>
      <Button sx={{color: '#ffffff'}} size="large">Ny transaktion &#187;</Button>

      </CardActions>

      </Link>
      </div>
      <div className="div2">
      <Link to="/transactions/">

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{color: '#ffffff'}}>
          Visa alla transaktioner
        </Typography>

      </CardContent>
      <CardActions>
      <Button sx={{color: '#ffffff'}} size="large">Alla transaktioner &#187;</Button>

      </CardActions>

      </Link>
      </div>
      <div className="div3">
      <Link to="/transactions/search">

<CardContent>
  <Typography gutterBottom variant="h5" component="div" sx={{color: '#ffffff'}}>
    Sök efter transaktion
  </Typography>

</CardContent>
<CardActions>
<Button sx={{color: '#ffffff'}} size="large">Hitta transaktion &#187;</Button>

</CardActions>

</Link>
      </div>
      <div className="div4">
      <Link to="/transactions/">

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{color: '#ffffff'}}>
          Mina uppgifter
        </Typography>

      </CardContent>
      <CardActions>
      <Button sx={{color: '#ffffff'}} size="large">Mina uppgifter &#187;</Button>

      </CardActions>

      </Link>
      </div>

    </div>
  );
}
;

export default Dashboard;
