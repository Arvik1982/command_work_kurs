import { useSelector } from 'react-redux';


export default function UserUid(){
  
  const currentUser = useSelector(state=>state.store.currentUserUid)
  const localUser = localStorage.getItem('userUid')
  console.log(localUser)
  console.log(currentUser)
  
    return <h1 style={{color:'red'}}>UID:{currentUser}</h1>
}