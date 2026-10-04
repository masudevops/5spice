import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Market from './pages/Market';
import Kitchen from './pages/Kitchen';
import Sales from './pages/Sales';
import Catering from './pages/Catering';
import Pickup from './pages/Pickup';
import About from './pages/About';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import LocationMenu from './pages/LocationMenu';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/market" element={<Market />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/cafe" element={<Navigate to="/kitchen" replace />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:slug" element={<LocationDetail />} />
          <Route path="/locations/:slug/menu" element={<LocationMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
