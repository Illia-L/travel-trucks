import Layout from './components/ui/Layout/Layout';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';

function App() {

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={<HomePage/>}
        />

        <Route path='/campers'>
          <Route
            index
            element={<CatalogPage/>}
          />

          <Route
            path=':id'
            element={<p>Camper Page</p>}
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
