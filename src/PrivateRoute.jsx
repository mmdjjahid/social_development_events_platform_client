import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { CircleLoader } from "react-spinners";
import { AuthContext } from './Context/CreateContext';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    

    if (loading){
        return <div className='h-screen flex items-center justify-center'><CircleLoader /></div>
    }

    if (!user){
        return <Navigate state={location.pathname} to={'/login'}/>
    }


    return children;
};

export default PrivateRoute;