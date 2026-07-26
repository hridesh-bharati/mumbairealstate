// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
    const formattedAdminEmail = rawAdminEmail.trim().toLowerCase();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email) {
        const userEmail = user.email.trim().toLowerCase();
        setIsAdmin(userEmail === formattedAdminEmail);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, isAdmin, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-white">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Initializing System...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}