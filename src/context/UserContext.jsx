
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null); 

  const login = (name) => setUsername(name); 

  const logout = () => setUsername(null); 

  return (
    <UserContext.Provider value={{ username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
