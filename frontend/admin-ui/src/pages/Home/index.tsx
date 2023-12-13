import React from 'react'
import { useAuth } from '../../utils/Auth';
import './index.css'

const Home = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return;

  return (
    <div className="home-container">
      <div className='home-text-wrapper'>
        <h2>
          Velkommen til Jyllands-Posten CMP Admin Dashboard
        </h2>

        <p style={{ textAlign: 'center' }}>
          Her får du en hurtig og nem oversigt over alle dine domæner. Klik dig ind på et domæne for at justere dets indstillinger.
          Du kan også se detaljerede statistikker for hvert domæne og få indsigt i deres præstation. 
          
          <br />
          <br />

          Tak fordi du bruger Jyllands-Posten CMP admin dashboard - dit værktøj til effektiv og intuitiv domæneadministration.
        </p>
      </div>
    </div>
  )
}

export default Home;