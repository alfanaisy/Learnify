import { PropsWithChildren } from 'react';
import { useAppSelector } from '../redux/store/configureStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate replace to={'/login'} />;

  return children;
};

export default PrivateRoute;
