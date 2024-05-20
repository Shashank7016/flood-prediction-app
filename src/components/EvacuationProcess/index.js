// PopupComponent.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Table } from 'antd';
import { findZonesByProximity } from '../../util/distance';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;

const EvacuationProcess = ({ visible }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEvacuationStarted, setIsEvacuationStarted] = useState(false);
  const [evacuationZones, setEvacuationZones] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvacuationZone = async () => {
      try {
        const response = await fetch('http://localhost:4000/evacuation/');
        const data = await response.json();
        if (!user) return;
        const closestSafezone = findZonesByProximity(
          [user.latitude, user.longitude],
          data
        );
        console.log('Closest Safezone:', closestSafezone);
        setEvacuationZones(closestSafezone);
        console.log('Evacuation Zones:', data);
        if (!data) return;
        // setEvacuationZones(data);
      } catch (error) {
        console.error('Failed:', error);
      }
    };
    fetchEvacuationZone();
  }, [visible]);

  useEffect(() => {
    setIsModalVisible(visible);
    if (visible) {
      // Example condition to start evacuation process
      setIsEvacuationStarted(true);
    }
  }, [visible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Google Maps URL',
      dataIndex: 'url',
      key: 'url',
      render: (text, record) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          View on Google Maps
        </a>
      ),
    },
  ];

  return (
    <div>
      {visible && (
        <Button
          type='primary'
          onClick={showModal}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Check Warning Status
        </Button>
      )}
      <Modal
        title='Evacuation  Process has been started'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text strong>A Flood Warning has been issued in your Area</Text>
        {isEvacuationStarted && (
          <Paragraph type='warning'>
            The evacuation process has started. Please follow the instructions.
          </Paragraph>
        )}
        <Paragraph>
          Additional information about the evacuation process.
        </Paragraph>
        <Paragraph>Please ensure you have your emergency kit ready.</Paragraph>

        <Title level={5}>Evacuation Zones</Title>
        {evacuationZones.length > 0 ? (
          <Table
            dataSource={evacuationZones.map((zone, index) => ({
              key: index,
              name: zone.zoneName,
              latitude: zone.latitude,
              longitude: zone.longitude,
            }))}
            columns={columns}
            pagination={false}
          />
        ) : (
          <Paragraph>No evacuation zones available.</Paragraph>
        )}
      </Modal>
    </div>
  );
};

export default EvacuationProcess;
