import {useAuth} from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { deflate } from "zlib";

const ProtectedRoute = ({children}) => {
    const {authUser, loading} = useAuth();

    //if we are still checking the cooki, show nothing or a spinner
    if(loading) return null;


    //if no user is logged in , redirect to login page
    if(!authUser) {
        return <Navigate to="/login" replace />
    }

    //if user exists, render teh protected page (Dashboard, Profile, etc.)
       return children;
    }

 export default ProtectedRoute;
