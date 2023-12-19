import React from 'react'
import { useAuth } from '../../utils/Auth';
import './index.css'

const Statistics = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;
  
  return (
    <div className="statistics-container">
      Statistics - Work in progress
    </div>
  )
}

export default Statistics;