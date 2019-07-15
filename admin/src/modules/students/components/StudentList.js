import React, {
  useState,
  useMemo,
} from 'react';

import {
  Card,
  message,
  Table,
  Select,
  Spin,
} from 'antd';

import { Link } from 'react-router-dom';
import { useFetchDataIds } from '/lib/hooks';

const genders = {
  male: 'Male',
  female: 'Female',
}

function getColumns(props) {
  return [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Class',
      dataIndex: 'class_id',
      key: 'class_id',
      render: _id => {
        return ((props.classes.byId[_id] || {}).name) || _id;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => genders[gender],
    },
    {
      title: 'Game Progress',
      dataIndex: 'exam',
      key: 'progress',
      render: (exam) => {
        if (!exam) {
          return "";
        }

        return `${exam.status}${exam.status === 'ongoing' ? " (" + exam.progress + " %)" : ''}` ;
      }
    },
    {
      title: 'Result',
      dataIndex: 'exam',
      key: 'result',
      render: (exam) => {
        if (!exam) {
          return "";
        }

        if (!exam.result) {
          return "";
        }

        return `${exam.result} %`;
      }
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'actions',
      render: _id => {
        return (
          <Link to={`/students/view/${_id}`}>View</Link>
        );
      },
    }
  ];
}

export default function StudentList(props) {
  const columns = getColumns(props);
  const [selectedClassId, setSelectedClassId] = useState('');

  const [classIds, isFetchingClasses] = useFetchDataIds(() => {
    const query = { $limit: 999, $sort: { _id: -1 } };

    if (props.mainUser.role === 'teacher') {
      query.teacher_id = props.mainUser._id;
    }

    return props.getClasses(query);
  }, []);

  const [userIds, isFetchingUsers] = useFetchDataIds(() => {
    if (!classIds) {
      return;
    }

    const query = {
      $limit: 9999,
      $sort: { _id: -1 },
      role: 'student',
      class_id: selectedClassId || { $in: classIds },
      exam: true,
    };

    return props.getUsers(query);
  }, [classIds, selectedClassId]);

  const dataSource = useMemo(() => {
    if (!userIds) {
      return null;
    }

    return userIds.map(_id => props.users.byId[_id] || {});
  }, [userIds, props.users.byId]);

  return (
    <Card
      title={<div>List of Students <Link to="/students/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Select
        value={selectedClassId}
        onChange={(value) => { setSelectedClassId(value) }}
        placeholder="Select Class"
        notFoundContent={isFetchingClasses ? <Spin size="small" /> : 'No Data Available'}
        style={{ marginBottom: 5, minWidth: 200 }}
      >
        <Select.Option value="">All Classes</Select.Option>
        {
          classIds && classIds.map((_id) => (
           <Select.Option key={_id} value={_id}>{(props.classes.byId[_id] || {}).name || _id}</Select.Option>
          ))
        }
      </Select>
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetchingUsers}/>
    </Card>
  );
}
