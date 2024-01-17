import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/main";
import MyProfilePage from "./pages/myprofile";
import ErrPage  from "./pages/err";
import AuthorizationPage from "./pages/authorization";
import DescriptionPage from "./pages/Ioga";

export default function AppRoutes () {
    return(
        <Routes>
            <Route path="/" element ={<MainPage/>} />    
            <Route path="/profile" element ={<MyProfilePage/>} />
            <Route path="/auth" element ={<AuthorizationPage/>} /> 
            <Route path="/description" element ={<DescriptionPage/>} /> 
            <Route path="*" element ={<ErrPage/>} /> 
        </Routes>
    )

}
