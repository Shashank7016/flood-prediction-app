import React, { useState } from 'react';
import { DatePicker, Select, Button, Alert, Divider } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment'; // Ensure moment is installed for date manipulation

const { RangePicker } = DatePicker;
const { Option } = Select;

const AnalysisPage = () => {
  const [dates, setDates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [data, setData] = useState([]);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');

  const handleDateRangeChange = (dates, dateStrings) => {
    if (!dates) {
      setDates([]);
      setError(selectedLocation ? 'Please select a date range.' : 'Please select both date range and location.');
      setData([]);
      setAnalysisResult('');
    } else {
      setDates(dateStrings);
      setError('');
    }
  };

  const fetchData = () => {
    if (!dates.length || !selectedLocation) {
      setError('Please select both date range and location.');
      setData([]);
      setAnalysisResult('');
    } else {
      setError('');
      const startDate = moment(dates[0]);
      const endDate = moment(dates[1]);

      // Generate data for each day in the range
      const generatedData = [];
      for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        generatedData.push({
          date: m.format('YYYY-MM-DD'),
          seaLevel: 5 + Math.random() * 2, // Random fluctuation
          rainfall: 200 + Math.random() * 50, // Random fluctuation
          windDirection: 90 + Math.random() * 180 // Random fluctuation
        });
      }

      setData(generatedData);
      setAnalysisResult('True'); // Simulate analysis result
    }
  };

  return (
    <div>
      <h1>Flood Analysis</h1>
      <div style={{ display: 'flex', marginBottom: 20, alignItems: 'center' }}>
        <RangePicker onChange={handleDateRangeChange} />
        <Select placeholder="Select a location" style={{ width: 200, marginLeft: 20 }} onChange={setSelectedLocation}>
          <Option value="Location1">Location 1</Option>
          <Option value="Location2">Location 2</Option>
        </Select>
        <Button type="primary" onClick={fetchData} style={{ marginLeft: 20 }}>Go</Button>
      </div>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
      {data.length > 0 && (
        <>
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="seaLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
            <Line type="monotone" dataKey="windDirection" stroke="#ffc658" />
          </LineChart>
          <Divider />
          <h2>Analysis Result: {analysisResult}</h2>
        </>
      )}
    </div>
  );
};

export default AnalysisPage;
