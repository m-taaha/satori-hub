import { createContext, useContext, useState } from "react";

//create the consext
const AuthContext = createContext();

//crete the provider component
export const AuthContextProvider = ({children}) => {
    //this state will hold the logged-in user object
    const [authUser, setAuthUser] = useState(null);

    //we'll build login/logout funcitons soon
    const login = async (email, password) => {
        //TODO call our backend login api
        // for now let's just pretend we logged in 
        console.log("Login function called");
        setAuthUser({
            id: 123,
            email: email,
            firstName: "Test",
            lastName: "User",
        });
    };

    const logout = async () => {
        //TODO  call our backend logout api
        console.log("Logout function called");
        setAuthUser(null);
    };

    //the 'value' is what all the child components will be able to access
    const value = {
        authUser, 
        login, 
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// creating the custom hook for easy user
export const  useAuth = () => {
    const context = useContext(AuthContext);
    if(context ===  undefined) {
        throw new Error("UseAuth must be used within an AuthContextProvider");
    };
    return context;
};