import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authSelector } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  unAuth?: boolean;
  children: React.ReactElement;
};
export const ProtectedRoute = ({
  unAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const auth = useSelector(authSelector);
  const { from } = location.state || { from: { pathname: '/' } };

  if (!auth && !unAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (unAuth && auth) {
    return <Navigate to={from} />;
  }

  return children;
};
