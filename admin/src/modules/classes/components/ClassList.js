import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import {
  Card,
  message,
  Table,
} from 'antd';
import { Link } from 'react-router-dom';
import { useFetchDataIds  } from '/lib/hooks';

function getColumns(props) {
  return [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'School',
      dataIndex: 'school_id',
      key: 'school_id',
      render: _id => {
        return ((props.schools.byId[_id] || {}).name) || _id;
      },
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher_id',
      key: 'teacher_id',
      render: _id => {
        return ((props.users.byId[_id] || {}).name) || _id;
      },
    },
    {
      title: 'Grade Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pass Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'actions',
      render: _id => {
        return (
          <Link to={`/classes/view/${_id}`}>View</Link>
        );
      },
    }
  ];
}

export default function ClassList(props) {
  const columns = getColumns(props);

  const [classIds, isFetchingClasses] = useFetchDataIds(() => {
    const query = { $limit: 999, $sort: { _id: -1 } };

    if (props.mainUser.role === 'teacher') {
      query.teacher_id = props.mainUser._id;
    }

    return props.getClasses(query, true);
  }, []);

  const dataSource = useMemo(() => {
    if (!classIds) {
      return null;
    }

    return classIds.map(_id => props.classes.byId[_id] || {});
  }, [classIds]);

  return (
    <Card
      title={<div>List of Classes <Link to="/classes/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetchingClasses}/>
    </Card>
  );
}
