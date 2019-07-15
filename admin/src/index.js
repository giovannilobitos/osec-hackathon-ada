import React from 'react';
import ReactDOM from 'react-dom';
import { message as toastr } from 'antd';
import MainApp from './MainApp';
import store from './redux/store';
import app from './feathers';
import './lib/assets';
import * as serviceWorker from './serviceWorker';

serviceWorker.unregister();

app.set('store', store);

const initializeApp = function () {
  ReactDOM.render(<MainApp/>, document.getElementById('content'));
};

app.on('authenticated', (result) => {
  let tryCount = 0;
  (function getmainUser() {
    tryCount += 1;
    app.passport
      .verifyJWT(result.accessToken)
      .then(payload => app.service('users').get(payload.userId, { query: {} }))
      .then((mainUser) => {
        store.dispatch({
          type: 'LOGIN',
          mainUser,
        });
      })
      .catch((error) => {
        if (tryCount > 2) {
          return toastr.error(`An error occurred while validating accessToken. Debug:${error.message}`);
        }

        setTimeout(() => {
          getmainUser();
        }, 2000);
      });
  }());
});

(function connectToApp() {
  app.authenticate()
    .then(initializeApp)
    .catch((e) => {
      const { message } = e;
      if (message && (
        message.toLocaleLowerCase().includes('network error')
          || message.toLocaleLowerCase().includes('authentication timed out')
          || message.toLocaleLowerCase().includes('socket connection timed out')
      )) { // Retry
        toastr.error('Server is down. Trying to reconnect...');
        setTimeout(() => {
          connectToApp();
        }, 3000);
        return;
      }

      initializeApp();
    });
}());
