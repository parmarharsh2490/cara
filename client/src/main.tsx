import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/index.js';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
      <App/>
      </UserProvider>
        
    </StrictMode>
  </BrowserRouter>
);
