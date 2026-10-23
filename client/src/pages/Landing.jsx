import ComingSoonLanding from '../components/ComingSoonLanding';
import LaunchLanding from '../components/LaunchLanding';
import { isComingSoonMode } from '../config/site';

const Landing = () => {
    // Switch VITE_APP_SITE_MODE from "coming_soon" to "live" to show the full site.
    return isComingSoonMode ? <ComingSoonLanding /> : <LaunchLanding />;
};

export default Landing;
