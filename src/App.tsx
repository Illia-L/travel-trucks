import Layout from './components/ui/Layout/Layout';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import ProductPage from './pages/ProductPage/ProductPage';
import Features from './components/Features/Features';
import Reviews from './components/Reviews/Reviews';

function App() {
  return (
    <Layout>
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
      </Routes>
    </Layout>
  );
}

export default App;
