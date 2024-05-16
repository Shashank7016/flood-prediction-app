import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Select, message } from 'antd';
import L from 'leaflet';
import { Circle, Popup } from 'react-leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../../contexts/AuthContext';
import { findZonesByProximity } from '../../util/distance';
import axios from 'axios';

const { Option } = Select;

const FloodZone = () => {
  const [form] = Form.useForm();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [proximityZones, setProximityZones] = useState([]);
  const [selectedProximityZone, setSelectedProximityZone] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const lat = user?.user?.latitude;
    const lng = user?.user?.longitude;
    setLatitude(lat);
    setLongitude(lng);
    form.setFieldsValue({
      latitude: lat,
      longitude: lng,
    });
  }, [user, form]);

  useEffect(() => {
    const fetchProximityZones = async () => {
      try {
        const response = await fetch('http://localhost:4000/proximityzone');
        const data = await response.json();
        console.log('Proximity Zones:', data);
        if (!data) return;
        setProximityZones(data);
        console.log(
          'latitude:',
          form.getFieldValue('latitude'),
          'longitude:',
          form.getFieldValue('longitude')
        );
        let result = findZonesByProximity([latitude, longitude], data);
        setProximityZones(result);
        // setSelectedProximityZone(result[0]);
        console.log('Proximity Zones Reorder:', result);
      } catch (error) {
        console.error('Failed:', error);
      }
    };
    fetchProximityZones();
  }, [latitude, longitude]);

  const handleMapClick = (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setLatitude(lat);
    setLongitude(lng);
    form.setFieldsValue({
      latitude: lat,
      longitude: lng,
    });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const FlyToLocation = () => {
    const map = useMap();
    useEffect(() => {
      if (latitude && longitude) {
        map.flyTo([latitude, longitude], map.getZoom());
      }
    }, [latitude, longitude, map]);
    return null;
  };

  const handleProximityZoneChange = (value) => {
    console.log('Proximity Zone:', value);
    const zone = proximityZones.find((zone) => zone.zoneName === value);
    setSelectedProximityZone(value);
    // form.setFieldsValue({ proximityZone: zone ? zone : null });
  };

  const onFinish = async (values) => {
    console.log('Form values:', values);
    try {
      const respones = await axios.post(
        'http://localhost:4000/floodzone',
        values
      );
      console.log('Response:', respones.data);
      const respones2 = await axios.post('http://localhost:4000/alerts/', {
        location: `${values.latitude}, ${values.longitude}`,
        severity: 'high',
        message: 'Flood Alert',
        additionalNotes: 'Flood Alert',
        affectedAreas: 'Flood Zone',
        proximityZone: values.proximityZone,
      });
      console.log('Response:', respones2.data);
      message.success('Flood Zone Created');
      message.success(`Flood Alert sent to ${values.proximityZone}`);
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  return (
    <div style={{ width: '60%', margin: '0 auto', marginTop: '60px' }}>
      <h1>Flood zone Creation</h1>
      <Form
        form={form}
        name='flood_zone_form'
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          radius: 0,
        }}
      >
        <Form.Item
          label='Latitude'
          name='latitude'
          rules={[{ required: true, message: 'Please select a latitude' }]}
        >
          <InputNumber value={latitude} readOnly />
        </Form.Item>

        <Form.Item
          label='Longitude'
          name='longitude'
          rules={[{ required: true, message: 'Please select a longitude' }]}
        >
          <InputNumber value={longitude} readOnly />
        </Form.Item>

        <Form.Item
          label='Radius of Flood (meters)'
          name='radius'
          rules={[
            { required: true, message: 'Please input the radius of the flood' },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label='Proximity Zone'
          name='proximityZone'
          rules={[
            { required: true, message: 'Please select a proximity zone' },
          ]}
        >
          <Select
            placeholder='Select a Proximity Zone'
            onChange={handleProximityZoneChange}
            value={selectedProximityZone?.id}
            // disabled
          >
            {proximityZones.map((zone) => (
              <Option key={zone.id} value={zone._id}>
                {`${zone.zoneName} (${zone._id})`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <MapContainer
        style={{ height: '400px', width: '100%' }}
        center={[51.505, -0.09]}
        zoom={13}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {latitude && longitude && <Marker position={[latitude, longitude]} />}
        <MapClickHandler />
        <FlyToLocation />
        {proximityZones.map((zone, index) => (
          <Circle
            key={index}
            center={[zone.latitude, zone.longitude]}
            pathOptions={{ color: '#66b3ff' }}
            radius={zone.radius * 1000}
          ></Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default FloodZone;
