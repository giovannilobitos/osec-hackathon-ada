import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  message,
  Select,
  Spin,
} from 'antd';
import { useFetchDataIds } from '/lib/hooks';

function TeacherAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await props.createUser({ ...values, role: 'teacher' });
          message.success('Teacher created successfully.');
          props.history.push('/teachers/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, []);

  const [schoolIds, isFetchingSchools] = useFetchDataIds(() => {

    return props.getSchools({ $limit: 999 });
  }, []);


  const goToList = useCallback((e) => {
    e.preventDefault();
    props.history.push('/teachers/list');
  }, []);

  return (
    <Card
      title={<div>Add Teacher <Link to="/teachers/list" style={{ float: 'right' }}>Back To List</Link></div>}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item
          label="School"
        >
          {
            getFieldDecorator('school_id', {
              rules: [{ required: true, message: "school is required" }],
            })(
              <Select placeholder="Select School" notFoundContent={isFetchingSchools ? <Spin size="small" /> : 'No Data Available'}>
                {
                  schoolIds && schoolIds.map((_id) => (
                   <Select.Option key={_id} value={_id}>{(props.schools.byId[_id] || {}).name || _id}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item
          label="Name"
        >
          {
            getFieldDecorator('name', {
              rules: [{ required: true }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />,
            )
          }
        </Form.Item>
        <Form.Item
          label="Username"
        >
          {
            getFieldDecorator('username', {
              rules: [{ required: true }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
            )
          }
        </Form.Item>
        <Form.Item
          label="Password"
        >
          {
            getFieldDecorator('password', {
              rules: [{ required: true }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />,
            )
          }
        </Form.Item>
        <Button type="primary" loading={isSubmitting} htmlType="submit">Save</Button>
        &nbsp;
        <Button type="default" htmlType="button" onClick={goToList}>Cancel</Button>
      </form>
    </Card>
  );
}

export default Form.create()(TeacherAdd);
