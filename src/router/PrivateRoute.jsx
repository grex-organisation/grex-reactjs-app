import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/JWTService';


const PrivateRoute = () => {
    return (
        isAuthenticated() ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;
