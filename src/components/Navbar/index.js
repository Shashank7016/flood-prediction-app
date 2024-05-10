import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const items = [
    {
      label: <Link to='/'>Home</Link>,
      key: 'home',
    },
    {
      label: <Link to='/users'>Users</Link>,
      key: 'users',
    },
    {
      label: <Link to='/data'>Data</Link>,
      key: 'data',
    },
    {
      label: <Link to='/analysis'>Analysis</Link>,
      key: 'analysis',
    },
    {
      label: <Link to='/faq'>FAQ</Link>,
      key: 'faq',
    },
    {
      label: <Link to='/alerts'>Alerts</Link>,
      key: 'alerts',
    },
  ];

  return <Menu mode='horizontal' items={items} />;
};

export default Navbar;
