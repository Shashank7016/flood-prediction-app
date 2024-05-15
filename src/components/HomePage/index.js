import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import AlertList from '../AlertList';
import MarkerMap from '../Evacuation/Map';

const { Title } = Typography;
export default function HomePage() {
  const [alerts, setAlerts] = useState([]);
  const getAlerts = () => {
    axios.get('http://localhost:4000/alerts').then((response) => {
      console.log(response.data);
      setAlerts(response.data);
    });
  };

  useEffect(() => {
    getAlerts();
  }, []);
  return (
    <div style={{ margin: '0 auto', width: '80%', marginTop: '30px' }}>
      <Title level={3}>Welcome to Flood Management System</Title>
      <MarkerMap />
      <AlertList alertsData={alerts} />
    </div>
  );
}
