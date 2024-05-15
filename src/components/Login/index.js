import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      // Placeholder for authentication logic
      console.log('Received values of form: ', values);
      const { username, password } = values;
      // Here you would typically call a backend service to authenticate the user
      axios
        .get(`http://localhost:4000/users/${values.username}`)
        .then((response) => {
          console.log('Response Data', response.data);
          login({
            username: response.data.name,
            role: response.data.role == 'admin' ? 'admin' : 'user',
          });
          navigate('/home');
        })
        .catch((error) => {
          console.error('Failed:', error);
          setError('Login failed. Please try again later.');
        });
      // if (username === 'admin' && password === 'root') {
      //   login({ username, role: 'admin' ? 'admin' : 'user' });
      //   navigate('/home'); // Navigate to the dashboard or home page after login
      // } else {
      //   setError('Invalid username or password');
      // }
    } catch (error) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <h1>Login</h1>
      {error && <Alert message={error} type='error' showIcon />}
      <Form
        name='login_form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <Link to='/register'>Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
