// import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../img/logo.svg";


function BlackLogo({route='/'}) {
    return (
        <Link to={route}>
            <img src={logo} alt="logo" />
        </Link>
    );
}

export default BlackLogo;