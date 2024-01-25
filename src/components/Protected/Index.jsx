import { Outlet, Navigate } from "react-router-dom"



export const ProtectedRoute =({redirectPath ="/", isAllowed} )=>{
   
console.log(isAllowed)

    // let userLoginName = localStorage.getItem('userName')
    // isAllowed=Boolean(userLoginName)
    
    if (!isAllowed) {
    return(<Navigate to={redirectPath} replace={true}/>
   
    )
    
}
return <Outlet/>
}