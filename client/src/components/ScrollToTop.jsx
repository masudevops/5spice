import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Client-side navigation keeps the old scroll position, so a footer link
// would open the new page still scrolled to the bottom. Jump to the top on
// every new page; leave Back/Forward (POP) and #anchor links alone.
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType === 'POP' || hash) return;
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname, hash, navigationType]);

    return null;
};

export default ScrollToTop;
