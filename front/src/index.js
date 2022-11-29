import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import store from './redux/store';
import App from './App';
import GlobalStyle from './assets/GlobalStyle';

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
      <App />
    </Router>
  </Provider>,
);
