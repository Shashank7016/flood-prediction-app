import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, Row, Col } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const EvacuationComponent = () => {
  const [form] = Form.useForm();
  const [latitude, setLatitude] = useState(43.65107);
  const [longitude, setLongitude] = useState(-79.347015);

  const onFinish = (values) => {
    console.log('Form data:', values);
    // Send data to your backend or API here
    delete values.location;
    values.latitude = latitude;
    values.longitude = longitude;
    console.log('Form data:', values);
    axios
      .post('http://localhost:4000/evacuation/create', values)
      .then((response) => {
        console.log(response.data);
        message.success('Evacuation Zone Creation successful');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('There was an error creating the evacuation zone./');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleMapClick = (e) => {
    setLatitude(e.latlng.lat);
    setLongitude(e.latlng.lng);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        console.log('Latitude:', latitude, 'Longitude:', longitude);
      },
    });

    return <Marker position={[latitude, longitude]} />;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <div style={{ width: '60%' }}>
        <Form
          form={form}
          name='evacuationForm'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
          initialValues={
            {
              // zoneName: 'Chennai',
              // capacity: 400,
              // currentOccupancy: 0,
              // members: 0,
              // latitude: latitude,
              // longitude: longitude,
            }
          }
        >
          <Form.Item
            label='Zone Name'
            name='zoneName'
            rules={[{ required: true, message: 'Please input zone name!' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Capacity'
                name='capacity'
                rules={[
                  {
                    required: true,
                    message: 'Please input capacity',
                    // defaultField: '400',
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Current Occupancy'
                name='currentOccupancy'
                rules={[
                  {
                    required: true,
                    message: 'Please input current occupancy!',
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label='Members'
            name='members'
            rules={[
              { required: true, message: 'Please input number of members!' },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label='Location' name='location'>
            <div style={{ height: '400px', width: '100%' }}>
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: '100%' }}
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[latitude, longitude]} />
                <LocationMarker />
              </MapContainer>
            </div>
          </Form.Item>

          {/* Hidden fields for latitude and longitude, populated by map clicks */}
          <Form.Item name='latitude' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='longitude' hidden>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EvacuationComponent;
