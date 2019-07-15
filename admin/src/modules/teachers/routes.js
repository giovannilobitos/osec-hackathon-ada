import React from 'react';
import { Route } from 'react-router-dom';
import TeacherList from './containers/TeacherList';
import TeacherAdd from './containers/TeacherAdd';

export default function TeachersRoutes() {
  return (
    <div>
      <Route exact path="/teachers/list/:pageNum?" component={TeacherList}></Route>
      <Route exact path="/teachers/add" component={TeacherAdd}></Route>
    </div>
  );
}
