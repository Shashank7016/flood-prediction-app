import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // Exclude certain paths from showing the navbar
  const excludePaths = ['/', '/login', '/register'];
  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  let items = [
    {
      label: <Link to='/home'>Home</Link>,
      key: 'home',
    },
    {
      label: <Link to='/faq'>FAQ</Link>,
      key: 'faq',
    },
  ];

  if (user) {
    if (user.role === 'admin') {
      items = items.concat([
        { label: <Link to='/users'>Users</Link>, key: 'users' },
        { label: <Link to='/data'>Data</Link>, key: 'data' },
        { label: <Link to='/analysis'>Analysis</Link>, key: 'analysis' },
        { label: <Link to='/alerts'>Alerts</Link>, key: 'alerts' },
        { label: <Link to='/evacuation'>Evacuation</Link>, key: 'evacuation' },
        {
          label: <Link to='/proximityzone'>Proximity Zone</Link>,
          key: 'proximityzone',
        },
      ]);
    }
  }

  // Add logout button
  items.push({
    label: (
      <Button
        type='link'
        style={{ marginLeft: 'auto' }}
        onClick={async () => {
          await logout();
          navigate('/'); // Redirect to home or login after logout
        }}
      >
        Logout
      </Button>
    ),
    key: 'logout',
  });

  return <Menu mode='horizontal' items={items} />;
};

export default Navbar;
