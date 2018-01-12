import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Conf from './Conf';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

const pathExists = require('path-exists');
if(pathExists.sync('dbkonf'))ReactDOM.render(<App />, document.getElementById('root'));
else ReactDOM.render(<Conf />, document.getElementById('root'));
registerServiceWorker();
