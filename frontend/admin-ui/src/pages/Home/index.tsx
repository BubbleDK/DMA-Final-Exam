import React from 'react'
import { useAuth } from '../../utils/Auth';

const Home = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;

  return (
    <div>Home</div>
  )
}

export default Home;