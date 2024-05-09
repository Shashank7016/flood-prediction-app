import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import AlertList from '../AlertList';

const { Title } = Typography;
export default function HomePage() {
  const [alerts, setAlerts] = useState([]);
  const getAlerts = () => {
    axios.get('http://localhost:3000/alerts').then((response) => {
      console.log(response.data);
      setAlerts(response.data);
    });
  };

  useEffect(() => {
    getAlerts();
  }, []);
  return (
    <div>
      <Title level={3}>Welcome to Flood Management System</Title>
      <AlertList alertsData={alerts} />
    </div>
  );
}
