import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {
  HashRouter,
} from "react-router-dom";
import { AuthProvider } from './utils/Auth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={{fontFamily: 'Nunito, sans-serif'}}>
      <AuthProvider>
        <HashRouter>
          <App/>
        </HashRouter>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>,
)
