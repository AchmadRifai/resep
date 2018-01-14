import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Conf from './Conf';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
