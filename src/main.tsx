import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import './css/reset.css';
import './css/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
