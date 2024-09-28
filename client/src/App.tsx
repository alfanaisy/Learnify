import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import DetailPage from './pages/DetailPage';
import Layout from './layout';
import 'antd/dist/reset.css';
import CategoryPage from './pages/CategoryPage';
import DescriptionPage from './pages/DescriptionPage';
import BasketPage from './pages/BasketPage';
import { useEffect } from 'react';
import agent from './actions/agent';
import { useAppDispatch } from './redux/store/configureStore';
import { setBasket } from './redux/slices/basketSlice';
import Categories from './components/Categories';

function App() {
  const dispatch = useAppDispatch();

  const getCookie = (name: string) => {
    return (
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
      ''
    );
  };

  useEffect(() => {
    const clientId = getCookie('clientId');
    if (clientId) {
      agent.Baskets.get()
        .then((response) => {
          dispatch(setBasket(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
