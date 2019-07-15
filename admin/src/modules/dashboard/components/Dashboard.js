import React from 'react';
import {
  Card,
  Icon,
} from 'antd';
import { Redirect } from 'react-router-dom';
import ClassList from '/modules/classes/containers/ClassList';

export default function Dasboard(props) {
  if (props.mainUser.role === 'teacher') {
    return (
      <Redirect to="/classes/list"/>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: 10,
    }}>
      {
        [
          "Hipodromo Elementary School",
          "Mabolo Elementary School",
          "Lahug Elementary School",
          "Carreta Elementary School",
          "City Central",
        ].map((key, i) => (
          <Card
            key={i}
            title={key}
          >
            <p><Icon type="user" /> <b>{Math.ceil(Math.random() * 2000)}</b> Students</p>
            <p><Icon type="flag" style={{ color: '#eb2f96' }}/> <b>{Math.ceil(Math.random() * 20)}</b> Possible Abused</p>
          </Card>
        ))
      }
    </div>
  )
}
