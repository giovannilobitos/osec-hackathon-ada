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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export default function SchoolList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [schoolIds, setSchoolIds] = useState(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const schools = await props.getSchools({ $limit: 9999, $sort: { _id: -1 } });
      setSchoolIds(schools.data.map(({ _id }) => _id));
    } catch (error) {
      message.error(error.message);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = useMemo(() => {
    if (!schoolIds) {
      return null;
    }

    return schoolIds.map(_id => props.schools.byId[_id] || {});
  }, [schoolIds]);

  return (
    <Card
      title={<div>List of Schools <Link to="/schools/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
