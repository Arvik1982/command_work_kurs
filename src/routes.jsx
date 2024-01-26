import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main'
import MyProfilePage from './pages/Myprofile'
import ErrPage from './pages/Err'
import AuthorizationPage from './pages/Authorization'
import DescriptionPage from './pages/Yoga'
import ChangePasswordPage from './pages/ChangePassword'
import VideoPage from "./pages/VideoPage";
import TestPage from './pages/TestPage'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from './components/Protected/Index'

export default function AppRoutes() {
  const user = useSelector(state=>state.store.currentUserUid)
  console.log (Boolean(user))
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      
      <Route path="/auth" element={<AuthorizationPage />} />
      <Route path="/change_password" element={<ChangePasswordPage />} />
      <Route path="/description/:id" element={<DescriptionPage />} />
      <Route path="*" element={<ErrPage />} />
      <Route path="/workout/video" element={<VideoPage/>} />
      <Route path="/test" element={<TestPage/>} />
{/*доступ только залогиненым*/}
      <Route element ={<ProtectedRoute isAllowed={Boolean(user)}/>}>
      <Route path="/profile" element={<MyProfilePage />} />
      
      </Route>
{/*доступ только залогиненым*/}

    </Routes>
  )
}
