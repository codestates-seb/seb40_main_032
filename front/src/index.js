import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { HelmetProvider } from 'react-helmet-async';
// import axios from 'axios';
import store from './redux/store';
import App from './App';
import GlobalStyle from './assets/GlobalStyle';

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND;
// axios.defaults.withCredentials = true;

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_TRACKING_DNS,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: process.env.REACT_APP_BACKEND,
    }),
  ],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </Provider>,
);
