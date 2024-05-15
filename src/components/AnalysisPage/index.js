import React, { useState, useRef } from 'react';
import { DatePicker, Select, Button, Alert, Divider } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import moment from 'moment'; // Ensure moment is installed for date manipulation
import { useLocation } from 'react-router-dom';
import './Analysis.css';
import FloodPredictionForm from '../FloodPredictionForm';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AnalysisPage = () => {
  const colors = [
    '#8884d8', // Rainfall Amount
    '#82ca9d', // River Water Level
    '#ffc658', // Soil Moisture Content
    '#ff7300', // Temperature
    '#0088FE', // Relative Humidity
    '#00C49F', // Wind Speed
    '#FFBB28', // Topography
    '#FF8042', // Urbanization Rate
    '#FF0000', // Drainage System Capacity
    '#00FF00', // Previous Flood History
    '#0000FF', // Flood Event
  ];
  const location = useLocation();
  const [dates, setDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);
  const data1 = location.state?.data;
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [algorithm, setAlgorithm] = useState('logistic_regression');
  const downloadChart = () => {
    let chartRef;
    switch (chartType) {
      case 'line':
        chartRef = lineChartRef;
        break;
      case 'bar':
        chartRef = barChartRef;
        break;
      case 'pie':
        chartRef = pieChartRef;
        break;
      default:
        return;
    }

    if (chartRef.current) {
      const svg = chartRef.current.container.children[0];
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.download = 'chart.png';
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(
        unescape(encodeURIComponent(svgData))
      )}`;
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart
            width={600}
            height={300}
            data={chartData}
            ref={lineChartRef}
            style={{ margin: '0 auto' }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='value' stroke='#8884d8'>
              {chartData.map((entry) => (
                <Line
                  key={entry.name}
                  type='monotone'
                  dataKey='value'
                  data={[entry]}
                  stroke={entry.color}
                />
              ))}
            </Line>
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart
            width={600}
            height={300}
            data={chartData}
            style={{ margin: '0 auto' }}
            ref={barChartRef}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='value'>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart
            width={300}
            height={300}
            style={{ margin: '0 auto' }}
            ref={pieChartRef}
          >
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              fill='#8884d8'
              label
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return null;
    }
  };

  const handleDateRangeChange = (dates, dateStrings) => {
    if (!dates) {
      setDates([]);
      setError(
        selectedLocation
          ? 'Please select a date range.'
          : 'Please select both date range and location.'
      );
      setData([]);
      setAnalysisResult('');
    } else {
      setDates(dateStrings);
      setError('');
    }
  };

  /*const fetchData = () => {
    if (Object.keys(data).length > 0) {
      // Example: assuming data contains properties like rainfallAmount, temperature, and relativeHumidity
      const chartData = [
        { category: "Rainfall", value: data.rainfallAmount },
        { category: "Temperature", value: data.temperature },
        { category: "Humidity", value: data.relativeHumidity }
      ];
      setChartData(chartData);  // Assuming you've defined a state [chartData, setChartData] for holding chartable data
    } else {
      console.error("No data available for charts");
      setError("No data available. Please fill and submit the form.");
    }
  };*/

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          margin: '0 auto',
          paddingBottom: '20px',
          paddingTop: '30px',
        }}
      >
        <h2 style={{ display: 'block', width: '100%' }}>Flood Analysis</h2>

        {/* <RangePicker onChange={handleDateRangeChange} /> */}
        <Select
          defaultValue='logistic_regression'
          style={{ width: 200 }}
          onChange={(value) => setAlgorithm(value)}
        >
          <Option value='logistic_regression'>Logistic Regression</Option>
          <Option value='decision_tree'>Decision Tree</Option>
          <Option value='svm'>Support Vector Machine (SVM)</Option>
        </Select>

        {/* <Select
          placeholder='Select a location'
          style={{ width: 200, marginLeft: 20 }}
          onChange={setSelectedLocation}
        >
          <Option value='Location1'>Location 1</Option>
          <Option value='Location2'>Location 2</Option>
        </Select> */}
        <Select
          defaultValue='line'
          style={{ width: 120, marginLeft: 20 }}
          onChange={(value) => setChartType(value)}
        >
          <Option value='line'>Line Chart</Option>
          <Option value='bar'>Bar Chart</Option>
          <Option value='pie'>Pie Chart</Option>
        </Select>
        <Button onClick={downloadChart} style={{ marginLeft: 20 }}>
          Download Chart
        </Button>
      </div>
      {chartData.length > 0 && (
        <div style={{ margin: '0 auto' }}>{renderChart()}</div>
      )}
      <FloodPredictionForm setChartData={setChartData} />
    </div>
  );
};

export default AnalysisPage;
