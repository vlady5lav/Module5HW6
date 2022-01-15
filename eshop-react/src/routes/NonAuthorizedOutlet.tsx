import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IoCTypes } from '../ioc';
import { useInjection } from '../ioc/ioc.react';
import AuthStore from '../stores/AuthStore';

const NonAuthorizedOutlet = () => {
  const store = useInjection<AuthStore>(IoCTypes.authStore);

  return !store.isAuthorized ? <Outlet /> : <Navigate replace to="/" />;
};

export default NonAuthorizedOutlet;
