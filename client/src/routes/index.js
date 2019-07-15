import React from 'react';
import {
  withRouter,
  Route,
  // Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
// import MainLayout from '/modules/core/containers/MainLayout';
// import Login from '/modules/core/containers/Login';
// import { bindActionCreators } from 'redux';
// import Students from '/modules/students/routes';
// import Exams from '/modules/exams/routes';
import Game from '/modules/game/containers/Game';

// function NotFound() {
//   return (
//     <div>
//       404
//     </div>
//   );
// }

// class PrivateRoute extends React.Component {
//   render() {
//     const {
//       component: Component, isAuthenticated, path, location, ...rest
//     } = this.props;
//
//     return (
//       <Route {...rest} render={props => (
//         isAuthenticated ? (
//             <MainLayout path={path} history={props.history} location={location}>
//               <Component />
//             </MainLayout>
//         ) : (
//           <Login />
//         )
//       )}/>
//     );
//   }
// }
//
// class UnauthenticatedOnlyRoute extends React.Component {
//   render() {
//     const { component: Component, isAuthenticated, ...rest } = this.props;
//     return (
//       <Route {...rest} render={props => (
//         !isAuthenticated ? (
//             <Component {...props}/>
//         ) : (
//           <Redirect to={{
//             pathname: '/',
//           }}/>
//         )
//       )}/>
//     );
//   }
// }

class MainRoutes extends React.Component {
  render() {
    // const { isAuthenticated } = this.props;

    return (
      <Switch>
        {
          /*
          <UnauthenticatedOnlyRoute path="/login" component={Login} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
          <PrivateRoute path="/students" component={Students} {...{ isAuthenticated }}></PrivateRoute>
          <PrivateRoute path="/exams" component={Exams} {...{ isAuthenticated }}></PrivateRoute>
          <PrivateRoute component={NotFound} isAuthenticated={isAuthenticated}></PrivateRoute>
          <Route path="/game" component={Game}></Route>
           */
        }
        <Route component={Game}></Route>

      </Switch>
    );
  }
}


export default withRouter(
  connect(state => ({
    ...state.core,
  }))(MainRoutes),
);
