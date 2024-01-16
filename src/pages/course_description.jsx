import './css/course_description.css';
import logo from '../img/logo_auth.png'

import courseImg from'../img/courseImg.png'

export default function DescriptionPage()
{
    return(
    <div className='course__page'>
        <div className='course__page_logo'>
        <img src={logo} alt="logo" />
        </div>
        <div className='course__page_image'>
        <img src={courseImg} alt="course image" />  
        </div>

        <div className='course__page_content'/>
        <div className='course__page_subscribe'/>
 </div>
    )
}