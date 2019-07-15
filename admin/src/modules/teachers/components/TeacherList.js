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
  Select,
  Spin,
} from 'antd';

import { Link } from 'react-router-dom';
import { useFetchDataIds } from '/lib/hooks';

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];;
}

export default function TeacherList(props) {
  const columns = getColumns(props);

  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [schoolIds, isFetchingSchools] = useFetchDataIds(() => {
    return props.getSchools({ $limit: 999 });
  }, []);

  const [teacherIds, isFetchingTeachers] = useFetchDataIds(() => {
    if (!schoolIds) {
      return;
    }

    const query = { $limit: 9999, $sort: { _id: -1 }, role: 'teacher' };

    if (selectedSchoolId) {
      query.school_id = selectedSchoolId;
    }

    return props.getUsers(query, true);
  }, [schoolIds, selectedSchoolId]);

  const dataSource = useMemo(() => {
    if (!teacherIds) {
      return null;
    }

    return teacherIds.map(_id => props.users.byId[_id] || {});
  }, [teacherIds]);

  return (
    <Card
      title={<div>List of Users <Link to="/teachers/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Select
        value={selectedSchoolId}
        onChange={(value) => { setSelectedSchoolId(value) }}
        placeholder="Select Class"
        notFoundContent={isFetchingSchools? <Spin size="small" /> : 'No Data Available'}
        style={{ marginBottom: 5, minWidth: 200 }}
      >
        <Select.Option value="">All Schools</Select.Option>
        {
          schoolIds && schoolIds.map((_id) => (
           <Select.Option key={_id} value={_id}>{(props.schools.byId[_id] || {}).name || _id}</Select.Option>
          ))
        }
      </Select>
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetchingTeachers}/>
    </Card>
  );
}
