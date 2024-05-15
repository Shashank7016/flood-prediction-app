import React, { useState } from 'react';
import { Form, Input, Button, Alert, message, InputNumber, Switch } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }
    try {
      // Here you would typically call a backend service to register the user
      axios.post('http://localhost:4000/users/', values).then((response) => {
        console.log('Response Data', response.data);
        console.log('Form Data', values);
        message.success('Form submitted successfully!');
      });
      message.success('Registration successful!');
    } catch (error) {
      console.error('Failed to register user:', error);
      message.error('Registration failed!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '0 auto',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <h1 style={{ textAlign: 'center', paddingBottom: '60px' }}>
        Registeration Form
      </h1>
      <Form
        name='register_form'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Age'
          name='age'
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Street'
          name='street'
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='City'
          name='city'
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='State'
          name='state'
          rules={[{ required: true, message: 'Please input your state!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Zip'
          name='zip'
          rules={[{ required: true, message: 'Please input your zip code!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Country'
          name='country'
          rules={[{ required: true, message: 'Please input your country!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          Admin: <Switch checked={isAdmin} onChange={setIsAdmin} />
        </Form.Item>

        {isAdmin && (
          <Form.Item
            label='Admin Password'
            name='adminPassword'
            rules={[
              { required: true, message: 'Please input the admin password!' },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account? <Link to='/'>Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
