import React, { createContext } from "react";

let  count =  0;

const UserContext = createContext(count);

const UserProvider = ({ children } : {children : React.ReactNode}) => {
  const [count] = React.useState(0);    
      return (
        <UserContext.Provider value={count}>
          {children}
        </UserContext.Provider>
      );
    };
    
    // Create a custom hook for using the context
    
    export { UserProvider };