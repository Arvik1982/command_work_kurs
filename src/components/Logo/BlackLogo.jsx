import React from 'react';
import logo from "../../img/logo.svg";
import {Link} from "react-router-dom";

function BlackLogo({route='/'}) {
    return (
        <Link to={route}>
            <img src={logo} alt="logo" />
        </Link>
    );
}

export default BlackLogo;