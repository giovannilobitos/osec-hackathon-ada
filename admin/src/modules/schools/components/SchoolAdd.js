import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  message,
} from 'antd';

function SchoolAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await props.createSchool({ ...values });
          message.success('School created successfully.');
          props.history.push('/schools/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, []);

  const goToList = useCallback((e) => {
    e.preventDefault();
    props.history.push('/schools/list');
  }, []);

  return (
    <Card
      title={<div>Add School <Link to="/schools/list" style={{ float: 'right' }}>Back To List</Link></div>}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item
          label="Name"
        >
          {
            getFieldDecorator('name', {
              rules: [{ required: true }],
            })(
              <Input placeholder="Name" />,
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

export default Form.create()(SchoolAdd);
