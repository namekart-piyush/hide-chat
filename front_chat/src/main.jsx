import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import AppRoutes from './config/Routes.jsx';
import { Toaster } from 'react-hot-toast';
import { ChatProvider } from './context/ChatContext.jsx';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ChatProvider>
        <BrowserRouter>
            <AppRoutes />
            <Toaster />
        </BrowserRouter>
      </ChatProvider>
    </ErrorBoundary>
  </StrictMode>,
)
