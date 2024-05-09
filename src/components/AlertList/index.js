import React from 'react';
import { Alert as AntdAlert, List, Typography } from 'antd';

const AlertList = ({ alertsData }) => {
  // Function to map severity to Ant Design alert types
  const getAlertType = (severity) => {
    switch (severity) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <List
      itemLayout='vertical'
      dataSource={alertsData}
      renderItem={(alert) => (
        <List.Item key={alert._id}>
          <AntdAlert
            message={`${alert.location} - ${alert.message}`}
            description={
              <>
                <Typography.Text>Severity: {alert.severity}</Typography.Text>
                {alert.additionalNotes && (
                  <Typography.Text>
                    Notes: {alert.additionalNotes}
                  </Typography.Text>
                )}
                <Typography.Text strong>Affected Areas:</Typography.Text>
                <ul>
                  {alert.affectedAreas.map((area) => (
                    <li key={area.location}>
                      {area.location} ({area.latitude}, {area.longitude})
                    </li>
                  ))}
                </ul>
              </>
            }
            type={getAlertType(alert.severity)}
            showIcon
          />
        </List.Item>
      )}
    />
  );
};

export default AlertList;
