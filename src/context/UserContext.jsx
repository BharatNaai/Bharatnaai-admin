import { createContext } from "react";

//step 1 create context
export const UserContext= createContext();

//step 2

export const UserDetails = ({ children }) => {
    const myName = "Vinod";
    const myAge = 20;
    // console.log(children);
    


    return (<UserContext.Provider value={{myName ,myAge} }>{children}</UserContext.Provider>);
};
