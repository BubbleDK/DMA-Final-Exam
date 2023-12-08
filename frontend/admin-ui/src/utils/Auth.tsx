import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CheckToken = async (token: string) => {
  try {
    const response = await axios.post('https://localhost:7163/api/Login/checkToken?token=' + token);

    return response.data;
  } catch (error) {
    console.error('Error during validation of token: ', error);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const TokenValidation = async () => {
        const data = await CheckToken(token);

        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }

      TokenValidation();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};