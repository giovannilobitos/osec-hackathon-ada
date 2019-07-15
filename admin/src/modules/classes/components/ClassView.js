import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Spin,
  message,
} from 'antd';

import { codeImages } from '/lib/assets/images'

export default function ClassView(props) {
  async function fetchDetails () {
    try {
      await props.getClasses({ _id: props._id }, true);
    } catch(error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [])

  if (!props.classDetails) {
    return (
      <div style={{textAlign: 'center' }}>
        <Spin size="large" style={{ marginTop: '15%' }}/>
      </div>
    );
  }

  const {
    school_id,
    teacher_id,
    level,
    name,
    code,
  } = props.classDetails;

  return (
    <Card
      title={<div>Class Details <Link to="/classes/list" style={{ float: 'right' }}>Back To List</Link></div>}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <p>
        <b>School: </b>{(props.schools.byId[school_id] || {}).name || school_id}
      </p>
      <p>
        <b>Teacher: </b>{(props.users.byId[teacher_id] || {}).name || teacher_id}
      </p>
      <p>
        <b>Grade Level: </b>{level}
      </p>
      <p>
        <b>Name: </b>{name}
      </p>

      <b><center>Pass Code</center></b>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: 10,
      }}>
        {
          code.split('').map((char, index) => {
            return (
              <span key={index} style={{
                background: `url(${codeImages[char]}) no-repeat center`,
                backgroundSize: 'cover',
                objectFit: 'contain',
                height: 200,

              }} />
            );
          })
        }
      </div>
    </Card>
  )
}
