import React from 'react';
import { Route } from 'react-router-dom';
import StudentList from './containers/StudentList';
import StudentAdd from './containers/StudentAdd';

export default function () {
  return (
    <div>
      <Route exact path="/students/list/:pageNum?" component={StudentList}></Route>
      <Route exact path="/students/add" component={StudentAdd}></Route>
    </div>
  )
}
