import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/auth-context';

const ProtectedRoute = () => {
    let auth = undefined; // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    let context = useContext(AuthContext)
    if (context) {
        auth = true;
    } 

    console.log(context)

    
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;