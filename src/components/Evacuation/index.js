import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, message, Row, Col } from 'antd';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const EvacuationComponent = () => {
  const [form] = Form.useForm();
  const [latitude, setLatitude] = useState(43.65107);
  const [longitude, setLongitude] = useState(-79.347015);
  const [map, setMap] = useState(null);

  const onFinish = (values) => {
    console.log('Form data:', values);
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
        message.error('There was an error creating the evacuation zone.');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        form.setFieldsValue({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    return <Marker position={[latitude, longitude]} />;
  };

  const MapWithGeoLocation = () => {
    const map = useMap();

    useEffect(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          map.flyTo([latitude, longitude], 13, { duration: 2 });
        });
      }
    }, []);

    return null;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '60%', marginTop: '30px' }}>
        <h1>Create Evacuation Zone</h1>
        <Form
          form={form}
          name='evacuationForm'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
          initialValues={{
            latitude,
            longitude,
          }}
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
                rules={[{ required: true, message: 'Please input capacity' }]}
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
                whenCreated={setMap}
              >
                <TileLayer
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[latitude, longitude]} />
                <LocationMarker />
                {/* <MapWithGeoLocation /> */}
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
