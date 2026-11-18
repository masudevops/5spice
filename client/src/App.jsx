import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { SelectedLocationProvider } from './hooks/useSelectedLocation';
import Landing from './pages/Landing';

// The homepage ships in the main bundle; every other page loads on demand.
// If a page's file can't be fetched (usually because a new version was
// deployed while the tab was open), reload once to pick up the new files.
const RELOAD_FLAG = '5spice-chunk-reload';
const lazyPage = (load) =>
  lazy(() =>
    load()
      .then((page) => {
        try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* storage unavailable */ }
        return page;
      })
      .catch((error) => {
        let alreadyReloaded = true;
        try {
          alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === '1';
          if (!alreadyReloaded) sessionStorage.setItem(RELOAD_FLAG, '1');
        } catch { /* storage unavailable: don't risk a reload loop */ }
        if (alreadyReloaded) throw error;
        window.location.reload();
        return new Promise(() => {});
      })
  );

const Market = lazyPage(() => import('./pages/Market'));
const Kitchen = lazyPage(() => import('./pages/Kitchen'));
const Sales = lazyPage(() => import('./pages/Sales'));
const Catering = lazyPage(() => import('./pages/Catering'));
const Pickup = lazyPage(() => import('./pages/Pickup'));
const About = lazyPage(() => import('./pages/About'));
const Contact = lazyPage(() => import('./pages/Contact'));
const Locations = lazyPage(() => import('./pages/Locations'));
const LocationDetail = lazyPage(() => import('./pages/LocationDetail'));
const LocationMenu = lazyPage(() => import('./pages/LocationMenu'));
const CateringMenu = lazyPage(() => import('./pages/CateringMenu'));
const NotFound = lazyPage(() => import('./pages/NotFound'));
const TvMenu = lazyPage(() => import('./pages/TvMenu'));

// Header, footer, and page container for every website page.
const SiteLayout = () => (
  <Layout>
    {/* Holds the page's space while it loads, so the footer doesn't jump up. */}
    <Suspense fallback={<div className="min-h-screen" />}>
      <Outlet />
    </Suspense>
  </Layout>
);

function App() {
  return (
    <SelectedLocationProvider>
      <Router>
        <Routes>
          {/* In-store TV menu boards: full screen, without the site header and footer. */}
          <Route path="/tv/:slug/:screen" element={<Suspense fallback={<div className="fixed inset-0 bg-ink-950" />}><TvMenu /></Suspense>} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/market" element={<Market />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/cafe" element={<Navigate to="/kitchen" replace />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/catering/menu" element={<CateringMenu />} />
            <Route path="/pickup" element={<Pickup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:slug" element={<LocationDetail />} />
            <Route path="/locations/:slug/menu" element={<LocationMenu />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </SelectedLocationProvider>
  );
}

export default App;
