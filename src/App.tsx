import { Route, Routes } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { lazy } from 'react';
import Layout from './components/ui/Layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const Features = lazy(() => import('./components/Features/Features'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

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
