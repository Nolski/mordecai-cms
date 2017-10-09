import React from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <div>
    <App />
    <Alert stack={{limit: 3}} timeout={5000} />
  </div>
), document.getElementById('root'));
registerServiceWorker();
