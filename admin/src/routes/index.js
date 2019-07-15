import React from 'react';
import {
  withRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import { Card } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '/modules/core/containers/MainLayout';
import Login from '/modules/core/containers/Login';
import Users from '/modules/users/routes';
import Admins from '/modules/admins/routes';
import Teachers from '/modules/teachers/routes';
import Students from '/modules/students/routes';
import Schools from '/modules/schools/routes';
import Classes from '/modules/classes/routes';
import Exams from '/modules/exams/routes';
import Dashboard from '/modules/dashboard/routes';

function NotFound() {
  return (
    <Card>
      <h3>
        Error 404: Page Not Found
      </h3>
    </Card>
  );
}

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, isAuthenticated, path, location, ...rest
    } = this.props;

    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
            <MainLayout path={path} history={props.history} location={location}>
              <Component />
            </MainLayout>
        ) : (
          <Login />
        )
      )}/>
    );
  }
}

class UnauthenticatedOnlyRoute extends React.Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        !isAuthenticated ? (
            <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/',
          }}/>
        )
      )}/>
    );
  }
}

class MainRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Switch>
        <UnauthenticatedOnlyRoute path="/login" component={Login} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
        <PrivateRoute path="/users" component={Users} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/admins" component={Admins} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/teachers" component={Teachers} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/students" component={Students} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/schools" component={Schools} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/classes" component={Classes} {...{ isAuthenticated }}></PrivateRoute>

        <PrivateRoute path="/exams" component={Exams} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute exact path="/" component={Dashboard} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/dashboard" component={Dashboard} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute component={NotFound} isAuthenticated={isAuthenticated}></PrivateRoute>
      </Switch>
    );
  }
}


export default withRouter(
  connect(state => ({
    ...state.core,
  }))(MainRoutes),
);
