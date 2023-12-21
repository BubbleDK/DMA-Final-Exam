import axios from 'axios';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  employeeData?: Employee;
  setEmployeeData: (employee: Employee) => void;
};

type Employee = {
  name: string;
  phone: string;
  email: string;
  companyId: number;
}

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I",
  },
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CheckToken = async (token: string) => {
  try {
    const response = await axios.post('https://localhost:7163/api/Login/checkToken?token=' + token, config);

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
              const url = `https://localhost:7163/api/Employees/${encodedEmail}`;

              const response = await axios.get(url, config);
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
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, employeeData, setEmployeeData }}>
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
    }, config);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('employeeEmail', response.data.email)

    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    // Handle errors here (e.g., user not found, wrong credentials)
  }
};

export default Login;