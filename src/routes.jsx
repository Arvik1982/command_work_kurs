import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main_";
import MyProfilePage from "./pages/Myprofile_";
import ErrPage  from "./pages/Err_";
import AuthorizationPage from "./pages/Authorization_";
import DescriptionPage from "./pages/Ioga_";
import ChangePasswordPage from "./pages/ChangePassword";

export default function AppRoutes () {
    return(
        <Routes>
            <Route path="/" element ={<MainPage/>} />    
            <Route path="/profile" element ={<MyProfilePage/>} />
            <Route path="/auth" element ={<AuthorizationPage/>} /> 
            <Route path="/change_password" element ={<ChangePasswordPage/>} /> 
            <Route path="/description" element ={<DescriptionPage/>} /> 
            <Route path="*" element ={<ErrPage/>} /> 
        </Routes>
    )

}
