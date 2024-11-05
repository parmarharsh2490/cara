import { createRoot } from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/index.js';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster.js';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <UserProvider>
    <App/>
      </UserProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <Toaster />
    </QueryClientProvider>
        
  </BrowserRouter>
);
