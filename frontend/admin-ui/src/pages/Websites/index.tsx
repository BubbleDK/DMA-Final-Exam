import React from 'react'
import { useAuth } from '../../utils/Auth';
import './index.css'

const Websites = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;

  return (
    <div className="websites-container">
      Websites
    </div>
  )
}

export default Websites;