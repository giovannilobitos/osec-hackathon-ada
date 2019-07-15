import React from 'react';
import { Provider } from 'react-redux';
import store from '/redux/store';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from '/routes';
// import app from './feathers';

// window.app = app;

export default class MainApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </Provider>
    );
  }
}
