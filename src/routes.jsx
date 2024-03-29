import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main'
import MyProfilePage from './pages/Myprofile'
import ErrPage from './pages/Err'
import AuthorizationPage from './pages/Authorization'
import DescriptionPage from './pages/Yoga'
import ChangePasswordPage from './pages/ChangePassword'
import VideoPage from "./pages/VideoPage";
import { ProtectedRoute } from './components/Protected/Index'

export default function AppRoutes() {
  
  const user = localStorage.getItem('userUid')

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthorizationPage />} />
      <Route path="/change_password" element={<ChangePasswordPage />} />
      <Route path="/description/:id" element={<DescriptionPage />} />
      <Route path="*" element={<ErrPage />} />
      <Route element ={<ProtectedRoute isAllowed={Boolean(user)}/>}>
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/workout/:id/:name" element={<VideoPage/>} />
      </Route>
    </Routes>
  )
}
