import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Market from './pages/Market';
import Cafe from './pages/Cafe';
import Sales from './pages/Sales';
import Catering from './pages/Catering';
import Pickup from './pages/Pickup';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const siteMode = import.meta.env.VITE_APP_SITE_MODE || 'live';
  const isComingSoon = siteMode === 'coming_soon';

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          {isComingSoon ? (
            // Redirect all routes to Home/Landing in Coming Soon mode
            <Route path="*" element={<Landing />} />
          ) : (
            <>
              <Route path="/market" element={<Market />} />
              <Route path="/cafe" element={<Cafe />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/pickup" element={<Pickup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </>
          )}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
