import axios from 'axios';

const Login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://localhost:7163/employees/login', {
      Email: email,
      Password: password
    });

    return response.data;
  } catch (error) {
    console.error('Error during login: ', error);
    // Handle errors here (e.g., user not found, wrong credentials)
  }
};

export default Login;
