import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Categories from './components/Categories';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Categories />
      <Outlet />
    </>
  );
};

export default Layout;
