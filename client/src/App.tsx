import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import DetailPage from './pages/DetailPage';
import Layout from './layout';

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
