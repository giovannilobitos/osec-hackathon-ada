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

function StudentAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          const data = { ...values, role: 'student' };

          // if (props.mainUser.role === 'teacher') {
          //   data.class_id = props.mainUser.class_id;
          // }

          await props.createUser(data);
          message.success('Student created successfully.');
          props.history.push('/students/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, []);

  const [classIds, isFetchingClasses] = useFetchDataIds(() => {
    const query = { $limit: 999, $sort: { _id: -1 } };

    if (props.mainUser.role === 'teacher') {
      query.teacher_id = props.mainUser._id;
    }

    return props.getClasses(query);
  }, []);

  const goToList = useCallback((e) => {
    e.preventDefault();
    props.history.push('/students/list');
  }, []);

  return (
    <Card
      title={<div>Add Student <Link to="/students/list" style={{ float: 'right' }}>Back To List</Link></div>}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item
          label="Class"
        >
          {
            getFieldDecorator('class_id', {
              rules: [{ required: true, message: "class is required" }],
            })(
              <Select placeholder="Select Class" notFoundContent={isFetchingClasses ? <Spin size="small" /> : 'No Data Available'}>
                {
                  classIds && classIds.map((_id) => (
                   <Select.Option key={_id} value={_id}>{(props.classes.byId[_id] || {}).name || _id}</Select.Option>
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
          label="Gender"
        >
          {
            getFieldDecorator('gender', {
              rules: [{ required: true }],
            })(
              <Select placeholder="Select Gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        {
          /*
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />,
              )
            }
          </Form.Item>
          */
        }
        <Button type="primary" loading={isSubmitting} htmlType="submit">Save</Button>
        &nbsp;
        <Button type="default" htmlType="button" onClick={goToList}>Cancel</Button>
      </form>
    </Card>
  );
}

export default Form.create()(StudentAdd);
