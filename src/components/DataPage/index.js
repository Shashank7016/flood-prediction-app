import React, { useState } from 'react';
import { Table, Select, DatePicker, Button, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const DataPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const columns = [
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Rainfall (inches)', dataIndex: 'rainfall', key: 'rainfall' },
    { title: 'Flood Prediction', dataIndex: 'floodPrediction', key: 'floodPrediction' },
  ];

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setError('');  // Clear any existing errors when user selects a date
  };

  const handleLocationChange = value => {
    setSelectedLocation(value);
    setError('');  // Clear any existing errors when user selects a location
  };

  const fetchData = () => {
    if (!selectedDate && !selectedLocation) {
      setError('Please select a date and a location.');
      setData([]);
    } else if (!selectedDate) {
      setError('Please select a date.');
      setData([]);
    } else if (!selectedLocation) {
      setError('Please select a location.');
      setData([]);
    } else {
      setError('');  // Clear any existing errors
      // Simulate data fetching
      setData([
        { key: '1', month: selectedDate.split('-')[1], year: selectedDate.split('-')[0], location: selectedLocation, rainfall: '5.4', floodPrediction: 'True' }
      ]);
    }
  };
  const visualizeData = () => {
    if (!data.length) {
      setError('No data to visualize. Please fetch data first.');
    } else {
      navigate('/analysis', { state: { data } });
    }
  };

  return (
    <div>
      <h1>Data Overview</h1>
      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
        <DatePicker onChange={handleDateChange} picker="month" placeholder="Select month and year" />
        <Select placeholder="Select a location" style={{ width: 200, marginLeft: 20 }} onChange={handleLocationChange}>
          <Option value="Location1">Location1</Option>
          <Option value="Location2">Location2</Option>
        </Select>
        <Button type="primary" onClick={fetchData} style={{ marginLeft: 'auto' }}>Go</Button>
        <Button onClick={visualizeData} style={{ marginLeft: 20 }}>Visualize Data</Button>
        {error && <Alert message={error} type="error" />}
      </div>
      {error && <Alert message={error} type="error" showIcon />}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DataPage;
