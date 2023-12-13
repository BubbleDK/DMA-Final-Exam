import React from 'react'
import { useAuth } from '../../utils/Auth';

const Statistics = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;
  
  return (
    <div>Statistics</div>
  )
}

export default Statistics;