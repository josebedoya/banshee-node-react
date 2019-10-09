import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById('root'));
