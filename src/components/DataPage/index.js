import React, { useState, useEffect } from 'react';
import { Table, Select, DatePicker, Button, Alert, Upload, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const { Option } = Select;
const { Dragger } = Upload;

const DataPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const staticColumns = [
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Rainfall (inches)', dataIndex: 'rainfall', key: 'rainfall' },
    { title: 'Wind (mph)', dataIndex: 'wind', key: 'wind' },
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
      const simulatedData = [
        { key: '1', month: selectedDate.split('-')[1], year: selectedDate.split('-')[0], location: selectedLocation, rainfall: '5.4', wind: '10', floodPrediction: 'True' }
      ];
      setData(simulatedData);
      setColumns(staticColumns);
      setAvailableColumns(staticColumns.map(col => ({
        title: col.title,
        dataIndex: col.dataIndex,
        key: col.key
      })));
      setSelectedColumns(staticColumns.map(col => col.dataIndex));
    }
  };

  const visualizeData = () => {
    if (!data.length) {
      setError('No data to visualize. Please fetch data first.');
    } else {
      navigate('/analysis', { state: { data } });
    }
  };

  const handleFileUpload = (file) => {
    setFile(file);
    Papa.parse(file, {
      complete: (result) => {
        const headers = result.data[0];
        const formattedData = result.data.slice(1).map((row, index) => {
          let rowData = { key: index };
          headers.forEach((header, i) => {
            rowData[header] = row[i];
          });
          return rowData;
        });

        setAvailableColumns(headers.map(header => ({
          title: header,
          dataIndex: header,
          key: header
        })));

        setData(formattedData);
        setColumns(headers.map(header => ({
          title: header,
          dataIndex: header,
          key: header
        })));
        setSelectedColumns(headers);
        setError('');  // Clear any existing errors when file is uploaded
        message.success(`${file.name} file uploaded successfully`);
      },
      header: false
    });
    return false; // Prevent automatic upload
  };

  const removeFile = () => {
    setFile(null);
    setData([]);
    setError('');
    setAvailableColumns([]);
    setSelectedColumns([]);
    setColumns([]);
    message.info('File removed');
  };

  useEffect(() => {
    setColumns(availableColumns.filter(col => selectedColumns.includes(col.dataIndex)));
  }, [selectedColumns, availableColumns]);

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
      <Dragger
        name="file"
        multiple={false}
        beforeUpload={handleFileUpload}
        onRemove={removeFile}
        fileList={file ? [file] : []}
        style={{ marginBottom: 20 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single upload. Click or drag a CSV file.</p>
      </Dragger>
      {availableColumns.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3>Select Columns to Display</h3>
          <Checkbox.Group
            options={availableColumns.map(col => col.dataIndex)}
            value={selectedColumns}
            onChange={setSelectedColumns}
          />
        </div>
      )}
      {error && <Alert message={error} type="error" showIcon />}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DataPage;
