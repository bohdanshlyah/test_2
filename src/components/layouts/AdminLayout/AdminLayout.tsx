import { Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AdminSideBar from '@components/AdminPanel/SideBar/SіdeBar';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';

import './AdminLayout.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mainAdminWrapper">
        <AdminSideBar />
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
};

export default Layout;
