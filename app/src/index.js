import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as Sentry from '@sentry/react';
import App from './App';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
