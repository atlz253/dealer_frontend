import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

const Root: FC = () => {
  return (
    <div className="d-flex">
      <SideNav />
      <Outlet />
    </div>
  );
}

export default Root;
