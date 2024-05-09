import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Space,
  Button,
  Alert as AntdAlert,
  Divider,
  Typography,
} from 'antd';
import './alertpage.css';
import axios from 'axios';
const { Title } = Typography;
const { Option } = Select;

const AlertComponent = () => {
  const [alertData, setAlertData] = useState({
    severity: 'low',
    location: '',
    message: '',
    // ... initialize other fields if needed
  });

  const [isAlertSubmitted, setIsAlertSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const onFinish = async (values) => {
    // Handle form submission (e.g., send data to an API)
    try {
      const response = await axios.post('http://localhost:3000/alerts', values);
      console.log('Success:', response.data);
      setIsAlertSubmitted(true);
      setIsError(false);
    } catch (error) {
      console.log('Error:', error);
      setIsAlertSubmitted(true);
      setIsError(true);
    }
    console.log('Success:', values);
    // setIsAlertSubmitted(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Inside the AlertComponent
  return (
    <div className='form-container'>
      <>
        {isAlertSubmitted && !isError && (
          <AntdAlert
            message='Alert Submitted'
            description='Your alert has been successfully submitted.'
            type='success'
            showIcon
            closable
          />
        )}
        {isAlertSubmitted && isError && (
          <AntdAlert
            message='Alert Request Failed'
            description='Failed to Complete this Request'
            type='error'
            showIcon
            closable
          />
        )}
        <Title level={1}>Submit an Alert</Title>

        <Form
          name='alertForm'
          layout='vertical'
          initialValues={alertData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name='severity'
            label='Severity'
            rules={[{ required: true, message: 'Please select severity!' }]}
          >
            <Select>
              <Option value='low'>Low</Option>
              <Option value='medium'>Medium</Option>
              <Option value='high'>High</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='location'
            label='Location'
            rules={[{ required: true, message: 'Please enter a location!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='message'
            label='Message'
            rules={[
              { required: true, message: 'Please enter an alert message!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name='additionalNotes' label='Additional Notes'>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name='affectedAreas' label='Affected Areas'>
            {/* (Implementation for array of objects - See below)  */}
            <Input.TextArea name='affectedAreas' label='Affected Areas' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit Alert
            </Button>
          </Form.Item>
        </Form>
      </>
    </div>
  );
};

export default AlertComponent;
