import React from 'react';
import { Link } from 'react-router-dom';

export default function ExamList() {
  return (
    <div>
      List of Exams <Link to="/exams/add">Add New</Link>
    </div>
  )
}
