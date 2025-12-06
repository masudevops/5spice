import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Supermarket from './pages/Supermarket';
import Restaurant from './pages/Restaurant';
import Sales from './pages/Sales';
import Catering from './pages/Catering';
import Pickup from './pages/Pickup';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/supermarket" element={<Supermarket />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
