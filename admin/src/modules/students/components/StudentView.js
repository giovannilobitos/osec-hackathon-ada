import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFetchDataIds } from '/lib/hooks';

import {
  Card,
  Spin,
  message,
  Divider,
  Table,
} from 'antd';

const columns = [
  {
    title: "Status",
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: "Progress",
    dataIndex: 'progress',
    key: 'progress',
    render: (progress) => {
      if (!progress) {
        return "";
      }

      return `${progress} %`;
    }
  },
  {
    title: "Result",
    dataIndex: 'result',
    key: 'result',
    render: (result) => {
      if (!result) {
        return "";
      }

      return `${result} %`;
    }
  },
];

export default function UserView(props) {
  async function fetchDetails () {
    try {
      await props.getUsers({ _id: props._id }, true);
    } catch(error) {
      message.error(error.message);
    }
  }

  const [examIds, isFetchingExams] = useFetchDataIds(() => {
    if (!props._id) {
      return;
    }

    fetchDetails();

    return props.getExams({
      student_id: props._id,
      status: 'done',
      $sort: {
        _id: -1
      },
    });
  }, []);

  const dataSource = useMemo(() => {
    if (!examIds) {
      return null;
    }

    return examIds.map(_id => props.exams.byId[_id] || {});
  }, [examIds]);

  if (!props.userDetails) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" style={{ marginTop: '15%' }}/>
      </div>
    );
  }

  const {
    name,
    school_id,
    class_id,
  } = props.userDetails;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Card
        title={<div>Student Details <Link to="/students/list" style={{ float: 'right' }}>Back To List</Link></div>}
      >
        <p>
          <b>School: </b>{(props.schools.byId[school_id] || {}).name || school_id}
        </p>
        <p>
          <b>Class: </b>{(props.classes.byId[class_id] || {}).name || school_id}
        </p>
        <p>
          <b>Name: </b>{name}
        </p>
      </Card>
      <Divider />
      <Card
        title="Exam History"
        style={{ maxWidth: 600, margin: 'auto' }}
      >
        <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetchingExams} />
      </Card>
    </div>
  )
}
