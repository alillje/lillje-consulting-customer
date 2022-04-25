import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import "./home.css";


const Home = () => {
    let {name} = useContext(AuthContext)

    return (
        <div>
        <h1>Home</h1>
        <h2>{name}</h2>
        </div>
    )
  
};

export default Home;
