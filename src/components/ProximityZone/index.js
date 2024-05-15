import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ProximityZone = () => {
  const [form] = Form.useForm();
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [center, setCenter] = useState([51.505, -0.09]); // Default center

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        form.setFieldsValue({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    return position.lat === null ? null : (
      <Marker position={[position.lat, position.lng]}></Marker>
    );
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
  };

  const MyMap = () => {
    const map = useMap();

    useEffect(() => {
      let isMounted = true;

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (!isMounted) return;
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          if (map) {
            map.flyTo([latitude, longitude], 13, {
              // animate: true,
              // duration: 3,
            });
          }
        });
      }

      return () => {
        isMounted = false;
      };
    }, [map]);

    return null;
  };

  return (
    <div style={{ padding: '20px', width: '60%', margin: '0 auto' }}>
      <h1>Create Proximity Zone</h1>
      <Form layout='vertical' form={form} onFinish={handleSubmit}>
        <Form.Item
          label='Zone Name'
          name='zoneName'
          rules={[{ required: true, message: 'Please input the zone name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Radius Covered'
          name='radius'
          rules={[{ required: true, message: 'Please input the radius in Km' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Latitude'
          name='latitude'
          rules={[{ required: true, message: 'Please input the latitude!' }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label='Longitude'
          name='longitude'
          rules={[{ required: true, message: 'Please input the longitude!' }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <LocationMarker />
        <MyMap />
      </MapContainer>
    </div>
  );
};

export default ProximityZone;
