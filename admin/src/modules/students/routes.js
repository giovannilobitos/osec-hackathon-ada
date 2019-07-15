import React from 'react';
import { Route } from 'react-router-dom';
import StudentList from './containers/StudentList';
import StudentAdd from './containers/StudentAdd';
import StudentView from './containers/StudentView';

export default function StudentsRoutes() {
  return (
    <div>
      <Route exact path="/students/list/:pageNum?" component={StudentList}></Route>
      <Route exact path="/students/view/:_id" component={StudentView}></Route>
      <Route exact path="/students/add" component={StudentAdd}></Route>
    </div>
  );
}
