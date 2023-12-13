import React from 'react'
import { useAuth } from '../../utils/Auth';

const Websites = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;

  return (
    <div>Websites</div>
  )
}

export default Websites;