import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../../dashboard/hooks/useAccounts";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { accounts } = useAccounts();
  const navigate = useNavigate();

  const login = (userName, password, setIsLoading) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    const credential = accounts.find(
      (a) => a.userName === userName && a.password === password
    );
    setTimeout(() => {
      if (!credential) {
        toast.error("Incorrect username or password!", { id: toastId });
      }
      else {
        setCurrentUser(credential);
        localStorage.setItem("currentUser", JSON.stringify(credential));
        toast.success("Logged In Successfully!", { id: toastId });
        navigate("/dashboard");
      }
      setIsLoading(false);
    }, 1500);
  };
  const logout = () => {
    const toastId = toast.loading("Logging out...");
    setTimeout(() => {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
      toast.success("Logged Out", { id: toastId });
      setTimeout(() => navigate("/"), 0);
    }, 1500);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
