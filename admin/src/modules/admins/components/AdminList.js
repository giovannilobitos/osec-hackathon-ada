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

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'username',
  },
];

export default function AdminList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [userIds, setUserIds] = useState(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const admins = await props.getUsers({ $limit: 9999, $sort: { _id: -1 }, role: 'admin' });
      setUserIds(admins.data.map(({ _id }) => _id));
    } catch (error) {
      message.error(error.message);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = useMemo(() => {
    if (!userIds) {
      return null;
    }

    return userIds.map(_id => props.users.byId[_id] || {});
  }, [userIds]);

  return (
    <Card
      title={<div>List of Users <Link to="/admins/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
