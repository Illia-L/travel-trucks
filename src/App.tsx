import Layout from './components/ui/Layout/Layout';
import { Route, Routes } from 'react-router';

function App() {

  return (
    <Layout>
      <Routes>
        <Route
          path='/'
          element={<p>Home Page</p>}
        />

        <Route path='/campers'>
          <Route
            index
            element={<p>Catalog Page</p>}
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
