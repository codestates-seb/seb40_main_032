import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import GlobalStyle from './assets/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </Provider>,
);
