import React from 'react';
import logo from "../../img/logo.png";
import {Link} from "react-router-dom";

function WhiteLogo({route='/'}) {
    return (
        <Link to={route}>
            <img src={logo} alt="logo" />
        </Link>
    );
}

export default WhiteLogo;