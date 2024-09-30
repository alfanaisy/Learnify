import 'antd/dist/reset.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './components/Categories';
import Layout from './layout';
import BasketPage from './pages/BasketPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';
import DescriptionPage from './pages/DescriptionPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import { fetchBasketAsync } from './redux/slices/basketSlice';
import { getUser } from './redux/slices/userSlice';
import { useAppDispatch } from './redux/store/configureStore';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBasketAsync());
    dispatch(getUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <>
              <Categories />
              <HomePage />
            </>
          ),
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/detail',
          element: <DetailPage />,
        },
        {
          path: '/category/:id',
          element: <CategoryPage />,
        },
        {
          path: '/course/:id',
          element: <DescriptionPage />,
        },
        {
          path: '/basket',
          element: <BasketPage />,
        },
        {
          path: '/profile',
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
