import axios from 'axios';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  employeeData?: Employee;
};

type Employee = {
  name: string;
  phone: string;
  email: string;
  companyId: number;
}

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
  const [employeeData, setEmployeeData] = useState<Employee>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const TokenValidation = async () => {
        const data = await CheckToken(token);

        if (data) {
          const employeeEmail = localStorage.getItem('employeeEmail');
          if (employeeEmail) {
            try {
              // Encode the email to ensure special characters are properly handled in the URL
              const encodedEmail = encodeURIComponent(employeeEmail);
              const url = `https://localhost:7163/employees/${encodedEmail}`;
      
              const response = await axios.get(url);
              // Handle the response data here
              setEmployeeData({
                name: response.data.name,
                phone: response.data.phone,
                email: response.data.email,
                companyId: response.data.companyId,
              })
              setIsLoggedIn(true);
            } catch (error) {
              console.error('Error fetching data: ', error);
              // Handle the error here
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      }

      TokenValidation();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, employeeData }}>
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

const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://localhost:7163/api/Login/login', {
      Email: email,
      Password: password
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('employeeEmail', response.data.email)

    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    // Handle errors here (e.g., user not found, wrong credentials)
  }
};

export default Login;