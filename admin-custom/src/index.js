import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://wordcamp2018.test/wp-json/wp/v2';

const username = 'admin';
const password = 'admin';
const basic = btoa(`${username}:${password}`);

axios.defaults.headers.common['Authorization'] = `Basic ${basic}`;

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
