import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/index.js';
import QueryProvider from './query/QueryProvider.tsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <UserProvider>
    <App/>
      </UserProvider>
    </QueryClientProvider>
        
    </StrictMode>
  </BrowserRouter>
);
