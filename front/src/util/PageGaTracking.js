import { useEffect } from 'react'; // useState
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const PageTracking = () => {
  const location = useLocation();
  //   const [initialized, setInitialized] = useState(false);

  /* localhost는 인지 못하게  */
  //   useEffect(() => {
  //     if (!window.location.href.includes('localhost')) {
  //       ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, {
  //         debug: true,
  //       });
  //     }
  //     setInitialized(true);
  //   }, []);

  //   useEffect(() => {
  //     if (initialized) {
  //       ReactGA.pageview(location.pathname + location.search);
  //     }
  //   }, [initialized, location]);

  // 개발용
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, {
      debug: true,
    });
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default PageTracking;
