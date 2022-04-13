import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    // let [authToken, setAuthToken] = useState(localStorage.getItem(('lc_ab_mb_token') ? localStorage.getItem('lc_ab_mb_token') : null));
    // let [user, setUser] = useState(localStorage.getItem('lc_ab_mb_token') ? jwt_decode(localStorage.getItem('lc_ab_mb_token')) : null)

    let [authToken, setAuthToken] = useState(() => localStorage.getItem(('lc_ab_mb_token') ? localStorage.getItem('lc_ab_mb_token') : null));
    let [user, setUser] = useState(() => localStorage.getItem('lc_ab_mb_token') ? jwt_decode(localStorage.getItem('lc_ab_mb_token')) : null);

    const navigate = useNavigate()

    let loginUser = async (event) => {
        event.preventDefault();

        // Request auth
        try {
          const response = await fetch("/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: event.target.username.value, 
                password: event.target.password.value
            }),
          });
          
    
          const data = await response.json();
          const user = jwt_decode(data.access_token)
          if (response.status === 200) {
          setAuthToken(data)
          setUser(user)
          localStorage.setItem('lc_ab_mb_token', data.access_token);
          navigate('/dashboard')
          }


        } catch (error) {
          console.log(error);
        }
      };
    let contextData = {
        user: user,
        loginUser: loginUser
    }

    return (
        <AuthContext.Provider value={{contextData}}>
            {children}
        </AuthContext.Provider>
    )
}

