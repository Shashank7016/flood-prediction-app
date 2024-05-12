import React, { useState } from 'react';
import {
  Form,
  Input,
  Slider,
  Select,
  Button,
  Row,
  Col,
  Space,
  message,
} from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
const { Option } = Select;

const FloodPredictionForm = () => {
  const [form] = Form.useForm();
  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);

  const onFinish = (values) => {
    // Process and send the form data to your API
    axios
      .post('http://localhost:4000/ml/svm', values)
      .then((response) => {
        console.log(response.data);
        message.success('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('There was an error submitting the form.');
      });
    // console.log('Form data:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  const handleMapClick = (e) => {
    setLatitude(e.latlng.lat);
    setLongitude(e.latlng.lng);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return <Marker position={[latitude, longitude]} />;
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Check if values are empty or default
        if (
          Object.values(values).every((val) => val === undefined || val === '')
        ) {
          message.warning('Please enter some data before submitting.');
        } else {
          onFinish(values);
        }
      })
      .catch((errorInfo) => {
        onFinishFailed(errorInfo);
      });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout='vertical'
      style={{ width: '80%', margin: '0 auto', paddingBottom: '50px' }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label='Rainfall Amount (mm)'
            name='rainfallAmount'
            rules={[
              { required: true, message: 'Please enter rainfall amount' },
            ]}
          >
            <Slider min={0} max={500} />
          </Form.Item>
          <Form.Item
            label='River Water Level (m)'
            name='riverWaterLevel'
            rules={[
              { required: true, message: 'Please enter River water level' },
            ]}
          >
            <Slider min={0} max={10} />
          </Form.Item>
          <Form.Item
            label='Soil Moisture Content (%)'
            name='soilMoistureContent'
            rules={[
              { required: true, message: 'Please enter Soil Moisture Content' },
            ]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
          <Form.Item
            label='Temperature (°C)'
            name='temperature'
            rules={[
              { required: true, message: 'Please enter the temperature ' },
            ]}
          >
            <Slider min={-10} max={50} />
          </Form.Item>
          <Form.Item
            label='Relative Humidity (%)'
            name='relativeHumidity'
            rules={[
              { required: true, message: 'Please enter relative Humidity' },
            ]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='Wind Speed (km/h)'
            name='windSpeed'
            rules={[{ required: true, message: 'Please enter Wind Speed' }]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
          <Form.Item
            label='Topography (m)'
            name='topography'
            rules={[{ required: true, message: 'Please enter topography' }]}
          >
            <Slider min={0} max={500} />
          </Form.Item>
          <Form.Item
            label='Urbanization Rate (%)'
            name='urbanizationRate'
            rules={[
              { required: true, message: 'Please enter urbanization Rate' },
            ]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
          <Form.Item
            label='Drainage System Capacity (m³/s)'
            name='drainageSystemCapacity'
            rules={[
              {
                required: true,
                message: 'Please enter drainageSystemCapacity',
              },
            ]}
          >
            <Slider min={0} max={100} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label='Previous Flood History'
            name='previousFloodHistory'
            rules={[
              {
                required: true,
                message: 'Please Select the previousFloodHistory',
              },
            ]}
          >
            <Select>
              <Option value={0}>None</Option>
              <Option value={1}>Minor</Option>
              <Option value={2}>Moderate</Option>
              <Option value={3}>Major</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Flood Event'
            name='floodEvent'
            rules={[
              { required: true, message: 'Please select the flood Event' },
            ]}
          >
            <Select>
              <Option value={0}>No Flood</Option>
              <Option value={1}>Flood</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Latitude'>
            <Input value={latitude} disabled />
          </Form.Item>
          <Form.Item label='Longitude'>
            <Input value={longitude} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label='Location (Latitude, Longitude)'>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <LocationMarker />
        </MapContainer>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' onClick={handleSubmit}>
            Submit
          </Button>
          <Button htmlType='reset'>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FloodPredictionForm;
