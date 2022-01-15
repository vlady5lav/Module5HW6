import { configure } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { IoCContainer, IoCProvider } from './ioc';
import './styles.scss';

configure({
  enforceActions: 'never',
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <IoCProvider container={IoCContainer}>
      <App />
    </IoCProvider>
  </React.StrictMode>,
  rootElement
);
