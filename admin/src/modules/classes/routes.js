import React from 'react';
import { Route } from 'react-router-dom';
import ClassList from './containers/ClassList';
import ClassAdd from './containers/ClassAdd';
import ClassView from './containers/ClassView';

export default function ClassesRoutes() {
  return (
    <div>
      <Route exact path="/classes/list/:pageNum?" component={ClassList}></Route>
      <Route exact path="/classes/view/:_id" component={ClassView}></Route>
      <Route exact path="/classes/add" component={ClassAdd}></Route>
    </div>
  );
}
