import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Space,
  Button,
  Alert as AntdAlert,
  Divider,
  Typography,
  notification,
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
  const [proximityZones, setProximityZones] = useState([]);

  useEffect(() => {
    async function fetchProximityZones() {
      try {
        const response = await axios.get('http://localhost:4000/proximityzone');
        console.log('Proximity Zones:', response.data);
        // setAlertData({
        //   ...alertData,
        //   proximityZone: response.data[0].name,
        // });
        setProximityZones(response.data);
      } catch (error) {
        console.error('Failed:', error);
        setIsError(true);
      }
    }
    fetchProximityZones();
  }, []);

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      await axios.post('http://localhost:4000/alerts', values);
    } catch (error) {
      console.error('Failed:', error);
      setIsError(true);
    }
    notification.open({
      message: 'Alert Submitted',
      description: (
        <>
          <p>
            <strong>Severity:</strong> {values.severity}
          </p>
          <p>
            <strong>Location:</strong> {values.location}
          </p>
          <p>
            <strong>Message:</strong> {values.message}
          </p>
          {values.additionalNotes && (
            <p>
              <strong>Additional Notes:</strong> {values.additionalNotes}
            </p>
          )}
          {values.affectedAreas && (
            <p>
              <strong>Affected Areas:</strong> {values.affectedAreas}
            </p>
          )}
        </>
      ),
      placement: 'bottomRight',
      type: 'success',
      duration: 0, // Optional: set to 0 to make it stay until clicked away
      onClose: () => console.log('Notification Closed!'),
    });
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

          <Form.Item name='proximityZone' label='proximityZone'>
            <Select>
              {proximityZones.map((zone) => (
                <Option key={zone.id} value={zone._id}>
                  {/* {zone.name} */}
                  {`${zone.zoneName} (${zone._id})`}
                </Option>
              ))}
            </Select>
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
