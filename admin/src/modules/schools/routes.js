import React from 'react';
import { Route } from 'react-router-dom';
import SchoolList from './containers/SchoolList';
import SchoolAdd from './containers/SchoolAdd';

export default function SchoolsRoutes() {
  return (
    <div>
      <Route exact path="/schools/list/:pageNum?" component={SchoolList}></Route>
      <Route exact path="/schools/add" component={SchoolAdd}></Route>
    </div>
  );
}
