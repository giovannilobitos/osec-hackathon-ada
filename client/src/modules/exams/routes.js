import React from 'react';
import { Route } from 'react-router-dom';
import ExamList from './containers/ExamList';
import ExamAdd from './containers/ExamAdd';

export default function () {
  return (
    <div>
      <Route exact path="/exams/list/:pageNum?" component={ExamList}></Route>
      <Route exact path="/exams/add" component={ExamAdd}></Route>
    </div>
  )
}
