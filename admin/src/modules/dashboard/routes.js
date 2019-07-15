import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';

export default function DashboardRoutes() {
  return (
    <div>
      <Route exact path="/" component={Dashboard}></Route>
      <Route exact path="/dashboard" component={Dashboard}></Route>
    </div>
  );
}
