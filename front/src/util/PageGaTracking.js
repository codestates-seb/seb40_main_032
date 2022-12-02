import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default PageTracking;
