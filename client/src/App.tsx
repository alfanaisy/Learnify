import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import DetailPage from './pages/DetailPage';
import Layout from './layout';
import 'antd/dist/reset.css';
import CategoryPage from './pages/CategoryPage';
import DescriptionPage from './pages/DescriptionPage';
import BasketPage from './pages/BasketPage';
import { useStoreContext } from './context/storeContext';
import { useEffect } from 'react';
import agent from './actions/agent';

function App() {
  const { setBasket } = useStoreContext();

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
          setBasket(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setBasket]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <Login />,
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
