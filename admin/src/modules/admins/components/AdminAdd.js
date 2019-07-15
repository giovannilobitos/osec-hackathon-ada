import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  message,
} from 'antd';

function AdminAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await props.createUser({ ...values, role: 'admin' });
          message.success('Admin created successfully.');
          props.history.push('/admins/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, []);

  const goToList = useCallback((e) => {
    e.preventDefault();
    props.history.push('/admins/list');
  }, []);

  return (
    <Card
      title={<div>Add Admin <Link to="/admins/list" style={{ float: 'right' }}>Back To List</Link></div>}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
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

export default Form.create()(AdminAdd);
