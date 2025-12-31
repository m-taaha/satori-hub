import { createContext, useContext, useState } from "react";
import { toast } from "sonner";


//create the context
const AuthContext = createContext();

//create the provider component
export const AuthContextProvider = ({children}) => {
    //this state will hold the logged-in user object
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //we'll build login/logout funcitons soon
    const login = async (email, password) => {
        setLoading(true);

         try{
            const res = await fetch("api/v1/users/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
              credentials: "include",
            });

            const data = await res.json();
             
            if(!res.ok) {
                throw new Error(data.message || "Login Failed");
            }

            setAuthUser(data.user);
            toast.success("Welcome back!", {description: `Logged in as ${data.user.userName}`});
            return true;


         }catch(error){
            toast.error("Login Error",
                {description: error.message });
                return false;
         } finally {
            setLoading(false)
         }

    };

    const logout = async () => {

        try{
            const res = await fetch("/api/v1/users/logout", {method: "POST" });
            if(res.ok) {
                setAuthUser(null);
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    
    return <AuthContext.Provider value={{ authUser, setAuthUser, login, logout, loading }}>
        {children}
        </AuthContext.Provider>;
};

// creating the custom hook for easy user
export const  useAuth = () => {
    const context = useContext(AuthContext);
    if(context ===  undefined) {
        throw new Error("UseAuth must be used within an AuthContextProvider");
    };
    return context;
};