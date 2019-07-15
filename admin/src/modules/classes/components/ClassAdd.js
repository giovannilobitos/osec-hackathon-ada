import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Spin,
  Select,
} from 'antd';
import { useFetchDataIds } from '/lib/hooks';

function ClassAdd(props) {
  const isTeacher = props.mainUser.role === 'teacher';
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [selectedTeacherId, setSelectedTeacherId] = useState('');
  // const [isFetchingTeachers, setIsFetchingTeachers] = useState(false);
  // const [schoolIds, setSchoolIds] = useState(null);
  // const [teacherIds, setTeacherIds] = useState(null);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          const data = { ...values };

          if (isTeacher) {
            data.teacher_id = props.mainUser._id;
          }

          await props.createClass(data);
          message.success('Class created successfully.');
          props.history.push('/classes/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, []);

  const [schoolIds, isFetchingSchools] = useFetchDataIds(() => {
    return props.getSchools({ $limit: 999, $sort: { _id: -1 } });
  }, []);

  const [teacherIds, isFetchingTeachers] = useFetchDataIds(() => {
    if (isTeacher) {
      return [];
    }

    props.form.setFieldsValue({ teacher_id: undefined });

    return props.getUsers({ $limit: 999, role: 'teacher', school_id: selectedSchoolId, $sort: { _id: -1 } });
  }, [selectedSchoolId]);

  const goToList = useCallback((e) => {
    e.preventDefault();
    props.history.push('/classes/list');
  }, []);


  return (
    <Card
      title={<div>Add Class <Link to="/classes/list" style={{ float: 'right' }}>Back To List</Link></div>}
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
              <Select onChange={(value) => { setSelectedSchoolId(value) }} placeholder="Select School" notFoundContent={isFetchingSchools ? <Spin size="small" /> : 'No Data Available'}>
                {
                  schoolIds && schoolIds.map((_id) => (
                   <Select.Option key={_id} value={_id}>{(props.schools.byId[_id] || {}).name || _id}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        {
          !isTeacher && (
            <Form.Item
              label="Teacher"
            >
              {
                getFieldDecorator('teacher_id', {
                  rules: [{ required: true, message: "teacher is required" }],
                })(
                  <Select placeholder="Select Teacher" notFoundContent={isFetchingTeachers ? <Spin size="small" /> : 'No Data Available'}>
                    {
                      teacherIds && teacherIds.map((_id) => (
                       <Select.Option key={_id} value={_id}>{(props.users.byId[_id] || {}).name || _id}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
          )
        }

        <Form.Item
          label="Grade Level"
        >
          {
            getFieldDecorator('level', {
              rules: [{ required: true, message: "grade level is required" }],
            })(
              <Select placeholder="Select GradeLevel">
                {
                  [1,2,3,4,5,6,7,8,9,10,11,12].map((_id) => (
                   <Select.Option key={_id} value={_id}>Grade {_id}</Select.Option>
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

export default Form.create()(ClassAdd);
