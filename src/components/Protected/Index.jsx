import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ redirectPath = '/', isAllowed }) => {
  isAllowed = Boolean(localStorage.getItem('userUid'))
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />
  }
  return <Outlet />
}
