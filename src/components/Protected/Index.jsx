import { Outlet, Navigate } from "react-router-dom"



export const ProtectedRoute =({redirectPath ="/", isAllowed} )=>{
isAllowed=Boolean(localStorage.getItem('userName'))
console.log(isAllowed)
console.log(localStorage.getItem('userName'))
    // let userLoginName = localStorage.getItem('userName')
    // isAllowed=Boolean(userLoginName)
    
    if (!isAllowed) {
    return(<Navigate to={redirectPath} replace={true}/>
   
    )
    
}
return <Outlet/>
}