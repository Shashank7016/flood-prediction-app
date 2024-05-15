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
  Modal,
  Spin,
} from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
const { Option } = Select;

const colors = {
  'Rainfall Amount': '#8884d8',
  'River Water Level': '#82ca9d',
  'Soil Moisture Content': '#ffc658',
  Temperature: '#ff7300',
  'Relative Humidity': '#0088FE',
  'Wind Speed': '#00C49F',
  Topography: '#FFBB28',
  'Urbanization Rate': '#FF8042',
  'Drainage System Capacity': '#FF0000',
  'Previous Flood History': '#00FF00',
  'Flood Event': '#0000FF',
};

const FloodPredictionForm = ({ setChartData, algorithm }) => {
  const [form] = Form.useForm();

  const transformDataForChart = (values) => {
    return [
      {
        name: 'Rainfall Amount',
        value: values.rainfallAmount || 0,
        color: colors['Rainfall Amount'],
      },
      {
        name: 'River Water Level',
        value: values.riverWaterLevel || 0,
        color: colors['River Water Level'],
      },
      {
        name: 'Soil Moisture Content',
        value: values.soilMoistureContent || 0,
        color: colors['Soil Moisture Content'],
      },
      {
        name: 'Temperature',
        value: values.temperature || 0,
        color: colors['Temperature'],
      },
      {
        name: 'Relative Humidity',
        value: values.relativeHumidity || 0,
        color: colors['Relative Humidity'],
      },
      {
        name: 'Wind Speed',
        value: values.windSpeed || 0,
        color: colors['Wind Speed'],
      },
      {
        name: 'Topography',
        value: values.topography || 0,
        color: colors['Topography'],
      },
      {
        name: 'Urbanization Rate',
        value: values.urbanizationRate || 0,
        color: colors['Urbanization Rate'],
      },
      {
        name: 'Drainage System Capacity',
        value: values.drainageSystemCapacity || 0,
        color: colors['Drainage System Capacity'],
      },
      {
        name: 'Previous Flood History',
        value: values.previousFloodHistory || 0,
        color: colors['Previous Flood History'],
      },
      {
        name: 'Flood Event',
        value: values.floodEvent || 0,
        color: colors['Flood Event'],
      },
    ];
  };

  const handleValuesChange = (_, allValues) => {
    const chartData = transformDataForChart(allValues);
    setChartData(chartData);
  };

  const [latitude, setLatitude] = useState(37.7749);
  const [longitude, setLongitude] = useState(-122.4194);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setLoading(true);
    setPrediction(null);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    let algorithm_uri_base = 'http://localhost:4000/ml/';
    let algorithm_uri = '';
    if (algorithm === 'svm') {
      algorithm_uri = algorithm_uri_base + 'svm';
    } else if (algorithm === 'logistic_regression') {
      algorithm_uri = algorithm_uri_base + 'logistic_regression';
    } else if (algorithm === 'decision_tree') {
      algorithm_uri = algorithm_uri_base + 'decision_tree';
    }

    axios
      .post(algorithm_uri, values)
      .then((response) => {
        const formedObject = {
          ...values,
          predicted: response.data,
          algorithm: algorithm,
        };
        console.log('Formed Object', formedObject);
        setChartData(transformDataForChart(formedObject));
        showModal();
        axios
          .post(
            'http://localhost:4000/predictions/createPredictions',
            formedObject
          )
          .then((response) => {
            console.log('Response Data', response.data);
            setPrediction(response.data.predicted);
            setLoading(false);
            setIsModalVisible(true);
          })
          .catch((error) => {
            console.error('There was an error!', error);
          });
        message.success('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('There was an error!', error);
        message.error('There was an error submitting the form.');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  const handleMapClick = (e) => {
    setLatitude(e.latlng.lat);
    setLongitude(e.latlng.lng);
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return <Marker position={[latitude, longitude]} />;
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
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
      onValuesChange={handleValuesChange}
      style={{ width: '80%', margin: '0 auto', paddingBottom: '50px' }}
    >
      <Modal
        title='Flood Prediction Result'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          ,
          <Button
            key='alert'
            type='primary'
            // onClick={sendAlert}
            disabled={loading}
          >
            Send Alert
          </Button>,

          <Button key='ok' type='primary' onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin size='large' />
          </div>
        ) : (
          <>
            <p>
              Predicted Flood:{' '}
              <strong>{prediction === 1 ? 'Flood' : 'No Flood'}</strong>
            </p>
            <p>
              Algorithm Used: <strong>{algorithm}</strong>
            </p>
          </>
        )}
        {/* <p>
          Predicted Flood: <strong>True</strong>
        </p> */}
      </Modal>
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
