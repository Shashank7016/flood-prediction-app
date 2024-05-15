// import React from 'react';
// import { Table, Tag } from 'antd';

// const UsersPage = () => {
//   const usersData = [
//     {
//       key: '1',
//       username: 'johndoe',
//       userId: '1001',
//       email: 'johndoe@example.com',
//       status: 'active',
//     },
//     {
//       key: '2',
//       username: 'janedoe',
//       userId: '1002',
//       email: 'janedoe@example.com',
//       status: 'pending',
//     },
//     {
//       key: '3',
//       username: 'foobar',
//       userId: '1003',
//       email: 'foobar@example.com',
//       status: 'blocked',
//     },
//   ];

//   const columns = [
//     { title: 'Username', dataIndex: 'username', key: 'username' },
//     { title: 'User ID', dataIndex: 'userId', key: 'userId' },
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     {
//       title: 'Status',
//       key: 'status',
//       dataIndex: 'status',
//       render: (status) => {
//         let color =
//           status === 'active'
//             ? 'green'
//             : status === 'pending'
//             ? 'gold'
//             : 'volcano';
//         return <Tag color={color}>{status.toUpperCase()}</Tag>;
//       },
//     },
//   ];

//   return (
//     <div style={{ margin: '0 auto', marginTop: '30px', width: '80%' }}>
//       <h1>User List</h1>
//       <Table columns={columns} dataSource={usersData} />
//     </div>
//   );
// };

// export default UsersPage;
//Uncomment this code later when fetching data
import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, Button, message } from 'antd';
import axios from 'axios';

const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('http://localhost:4000/users/');
        setUsersData(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (email) => {
    try {
      await axios.post(`http://localhost:4000/users/update-status`, {
        newStatus: 'active',
        email: email,
      });
      setUsersData(
        usersData.map((user) =>
          user.email === email ? { ...user, status: 'active' } : user
        )
      );
      message.success('User accepted successfully');
    } catch (error) {
      console.error('Failed to accept user:', error);
      message.error('Failed to accept user');
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/users/${email}`);
      setUsersData(usersData.filter((user) => user.email !== email));
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      message.error('Failed to delete user');
    }
  };

  const columns = [
    { title: 'Username', dataIndex: 'name', key: 'name' },
    { title: 'User ID', dataIndex: '_id', key: '_id' },
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
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (role) => {
        let color = role === 'admin' ? 'purple' : 'geekblue';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.status === 'pending' ? (
            <>
              <Button type='primary' onClick={() => handleAccept(record.email)}>
                Accept
              </Button>
              <Button
                type='danger'
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
                onClick={() => handleDelete(record.email)}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              type='danger'
              style={{
                marginLeft: '10px',
                backgroundColor: 'red',
                color: 'white',
              }}
              onClick={() => handleDelete(record.email)}
            >
              Delete
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div style={{ margin: '0 auto', marginTop: '30px', width: '80%' }}>
      <h1>User List</h1>
      {loading ? <Spin /> : <Table columns={columns} dataSource={usersData} />}
    </div>
  );
};

export default UsersPage;
