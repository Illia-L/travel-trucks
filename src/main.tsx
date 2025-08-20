import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import './css/reset.css';
import './css/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
