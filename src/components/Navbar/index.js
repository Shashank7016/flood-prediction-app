import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
    },
    {
      label: <Link to="/data">Data</Link>,
      key: 'data',
    },
    {
      label: <Link to="/analysis">Analysis</Link>,
      key: 'analysis',
    },
    {
      label: <Link to="/faq">FAQ</Link>,
      key: 'faq',
    }
  ];

  return (
    <Menu mode="horizontal" items={items} />
  );
};

export default Navbar;
