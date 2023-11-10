import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("User")) || null
  );

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(currentUser));
  }, [currentUser]);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
