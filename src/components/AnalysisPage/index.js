import React, { useState,useRef } from 'react';
import { DatePicker, Select, Button, Alert, Divider } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import moment from 'moment'; // Ensure moment is installed for date manipulation
import './Analysis.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AnalysisPage = () => {
  const [dates, setDates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
   const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [algorithm, setAlgorithm] = useState('linearRegression');
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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
  
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
  
        const downloadLink = document.createElement("a");
        downloadLink.download = "chart.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
  
      img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
    }
  };
  
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart ref={lineChartRef} width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="seaLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
            <Line type="monotone" dataKey="windDirection" stroke="#ffc658" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart ref={barChartRef} width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="seaLevel" fill="#8884d8" />
            <Bar dataKey="rainfall" fill="#82ca9d" />
            <Bar dataKey="windDirection" fill="#ffc658" />
          </BarChart>
        );
        case 'pie':
            // Pie charts require data to be structured differently
            // Creating separate pie data for each attribute
            const pieDataSeaLevel = data.map(item => ({
              name: item.date,
              value: item.seaLevel
            }));
          
            const pieDataRainfall = data.map(item => ({
              name: item.date,
              value: item.rainfall
            }));
          
            const pieDataWindDirection = data.map(item => ({
              name: item.date,
              value: item.windDirection
            }));
          
            return (
              <div className="pie-charts-container">
                <PieChart ref={pieChartRef} width={300} height={300}>
                  <Pie data={pieDataSeaLevel} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    <Tooltip />
                  </Pie>
                </PieChart>
                <PieChart ref={pieChartRef} width={300} height={300}>
                  <Pie data={pieDataRainfall} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                    <Tooltip />
                  </Pie>
                </PieChart>
                <PieChart ref={pieChartRef} width={300} height={300}>
                  <Pie data={pieDataWindDirection} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#ffc658" label>
                    <Tooltip />
                  </Pie>
                </PieChart>
              </div>
            );          
      default:
        return null;
    }
  };

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
        <Select defaultValue="linearRegression" style={{ width: 200, marginLeft: 20 }} onChange={value => setAlgorithm(value)}>
          <Option value="linearRegression">Linear Regression</Option>
          <Option value="randomForest">Random Forest</Option>
          <Option value="decisionTree">Decision Tree</Option>
          <Option value="svm">Support Vector Machine (SVM)</Option>
        </Select>

        <Select placeholder="Select a location" style={{ width: 200, marginLeft: 20 }} onChange={setSelectedLocation}>
          <Option value="Location1">Location 1</Option>
          <Option value="Location2">Location 2</Option>
        </Select>
        <Select defaultValue="line" style={{ width: 120, marginLeft: 20 }} onChange={value => setChartType(value)}>
            <Option value="line">Line Chart</Option>
            <Option value="bar">Bar Chart</Option>
            <Option value="pie">Pie Chart</Option>
        </Select>
        <Button type="primary" onClick={fetchData} style={{ marginLeft: 20 }}>Go</Button>
        <Button onClick={downloadChart} style={{ marginLeft: 20 }}>Download Chart</Button>
      </div>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
      {data.length > 0 && (
        <>
          {renderChart()}
          <Divider />
          <h2>Analysis Result: {analysisResult}</h2>
        </>
      )}
    </div>
  );
};

export default AnalysisPage;
