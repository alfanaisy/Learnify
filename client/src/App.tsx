import 'antd/dist/reset.css';
import { useCallback, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './components/Categories';
import PrivateRoute from './components/PrivateRoute';
import Layout from './layout';
import BasketPage from './pages/BasketPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import Dashboard from './pages/Dashboard';
import DescriptionPage from './pages/DescriptionPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import { fetchBasketAsync } from './redux/slices/basketSlice';
import { fetchCurrentUser } from './redux/slices/userSlice';
import { useAppDispatch } from './redux/store/configureStore';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const appInit = useCallback(async () => {
    try {
      await dispatch(fetchBasketAsync());
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    appInit().then(() => setLoading(false));
  }, [appInit]);

  if (loading) return <Loading />;

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
        {
          path: '/checkout',
          element: (
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
