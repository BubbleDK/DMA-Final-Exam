import './App.css'
import Navbar from './components/Navbar'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Websites from './pages/Websites';
import Statistics from './pages/Statistics';

function App() { 
  return (
    <div className='app'>
      <Navbar />
      <Navigation />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  )
}

export default App
