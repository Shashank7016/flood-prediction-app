import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import {Link} from 'react-router-dom';

const RegisterPage = () => {
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    // Here you would typically call a backend service to register the user
    alert('Registration successful!');
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <h1>Register</h1>
      <Form
        name="register_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default RegisterPage;
