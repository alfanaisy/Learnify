import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import DetailPage from './pages/DetailPage';
import Layout from './layout';
import 'antd/dist/reset.css';
import CategoryPage from './pages/CategoryPage';
import DescriptionPage from './pages/DescriptionPage';

function App() {
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
