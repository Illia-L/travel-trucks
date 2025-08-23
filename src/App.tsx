import Layout from './components/ui/Layout/Layout';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import ProductPage from './pages/ProductPage/ProductPage';
import Features from './components/Features/Features';
import Reviews from './components/Reviews/Reviews';
import { Toaster } from 'react-hot-toast';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Layout>
      <div>
        <Toaster position='top-right' />
      </div>

      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />

        <Route path='/campers'>
          <Route
            index
            element={
              <PersistGate persistor={persistor}>
                <CatalogPage />
              </PersistGate>
            }
          />

          <Route
            path=':id'
            element={<ProductPage />}
          >
            <Route
              index
              element={<Features />}
            />

            <Route
              path='reviews'
              element={<Reviews />}
            />
          </Route>
        </Route>

        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
