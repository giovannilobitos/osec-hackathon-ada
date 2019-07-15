import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLayout (props) {
  async function handleLogout(e) {
    try {
      e.preventDefault();
      await props.logout();
    } catch(error) {
      console.log({ error });
    }
  }

  return (
      <div>
        <h1>
          Main Layout
        </h1>
        <ul>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
          <li><Link to="/students/list">Students</Link></li>
          {
            /*
              <li><Link to="/exams/list">Exams</Link></li>
              <li><Link to="/game">Start Game</Link></li>
            */
          }
        </ul>
        <hr />
        {props.children}
      </div>
  );
}
