import React from 'react';
import { Table, Tag } from 'antd';

const UsersPage = () => {
  const usersData = [
    {
      key: '1',
      username: 'johndoe',
      userId: '1001',
      email: 'johndoe@example.com',
      status: 'active',
    },
    {
      key: '2',
      username: 'janedoe',
      userId: '1002',
      email: 'janedoe@example.com',
      status: 'pending',
    },
    {
      key: '3',
      username: 'foobar',
      userId: '1003',
      email: 'foobar@example.com',
      status: 'blocked',
    },
  ];

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'active'
            ? 'green'
            : status === 'pending'
            ? 'gold'
            : 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div style={{ margin: '0 auto', marginTop: '30px', width: '80%' }}>
      <h1>User List</h1>
      <Table columns={columns} dataSource={usersData} />
    </div>
  );
};

export default UsersPage;
/*Uncomment this code later when fetching data
import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin } from 'antd';
import axios from 'axios';

const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/users');
        setUsersData(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        let color = status === 'active' ? 'green' : status === 'pending' ? 'gold' : 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    }
  ];

  return (
    <div>
      <h1>User List</h1>
      {loading ? <Spin /> : <Table columns={columns} dataSource={usersData} />}
    </div>
  );
};

export default UsersPage;
*/
