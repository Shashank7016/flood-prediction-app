import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import AlertList from '../AlertList';
import MarkerMap from '../Evacuation/Map';
import { useAuth } from '../../contexts/AuthContext';
import EvacuationProcess from '../EvacuationProcess';

const { Title } = Typography;
export default function HomePage() {
  const [alerts, setAlerts] = useState([]);
  const { connectedProximityZone } = useAuth();
  const [evacuationProcessStarted, setEvacuationProcessStarted] =
    useState(false);
  const getAlerts = async () => {
    console.log(connectedProximityZone);
    if (!connectedProximityZone) return;
    axios
      .get(
        `http://localhost:4000/alerts/proximityZone/${connectedProximityZone?._id}`
      )
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setAlerts(response.data);
        }
      });
  };

  const checkEvacuationProcess = async () => {
    if (!alerts) return;
    const evacuationAlert = alerts.find((alert) => alert.severity === 'high');
    console.log('Evacuation Alert:', evacuationAlert);
    setEvacuationProcessStarted(evacuationAlert ? true : false);
  };

  useEffect(() => {
    checkEvacuationProcess();
  }, [alerts]);

  useEffect(() => {
    getAlerts();
    checkEvacuationProcess();
  }, [connectedProximityZone]);
  return (
    <div style={{ margin: '0 auto', width: '80%', marginTop: '30px' }}>
      <Title level={3}>Welcome to Flood Management System</Title>
      <Title level={4} style={{ textAlign: 'right' }}>
        Connected Proximity Zone: {connectedProximityZone?.zoneName}
      </Title>
      <EvacuationProcess visible={evacuationProcessStarted} />
      <MarkerMap />
      <AlertList alertsData={alerts} />
    </div>
  );
}
