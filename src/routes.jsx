import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import MyProfilePage from "./pages/Myprofile";
import ErrPage  from "./pages/Err";
import AuthorizationPage from "./pages/Authorization";
import DescriptionPage from "./pages/Ioga";
import ChangePasswordPage from "./pages/ChangePassword";


export default function AppRoutes () {
    
    return(
        
        <Routes>
            <Route path="/" element ={<MainPage/>} />    
            <Route  path="/profile" element ={<MyProfilePage/>} />
            <Route path="/auth" element ={<AuthorizationPage/>} /> 
            <Route path="/change_password" element ={<ChangePasswordPage/>} /> 
            <Route path="/description" element ={<DescriptionPage/>} /> 
            <Route path="*" element ={<ErrPage/>} />

        </Routes>
    )

}
