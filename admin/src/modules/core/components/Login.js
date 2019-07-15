import React, { useState } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Card,
} from 'antd';
import logo from '/lib/assets/images/logo.png';

function NormalLoginForm(props) {
  const { login, form } = props;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    if (isLoggingIn) {
      return;
    }

    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsLoggingIn(true);
          await login(values);
        } catch (error) {
          setErrorMessage(error.message);
          setIsLoggingIn(false);
        }
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
      <div style={{ paddingTop: '5%', textAlign: 'center' }}>
        <Card style={{ margin: 'auto', maxWidth: 400 }}>
          <div style={{ padding: 15 }}>
            <img src={logo} style={{ maxWidth: 200 }}/>
          </div>
          <h3>
            Log In
          </h3>
          <div>
            <small style={{ color: 'red' }}>
              {errorMessage}
            </small>
          </div>
          <Form onSubmit={handleSubmit} className="login-form" style={{ margin: 'auto' }}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoggingIn}>
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
  );
}

export default Form.create()(NormalLoginForm);
