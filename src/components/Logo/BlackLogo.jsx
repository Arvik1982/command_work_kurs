import React from 'react';
import logo from "../../img/logo.svg";
import {Link} from "react-router-dom";

function BlackLogo() {
    return (
        <Link to='/'>
            <img src={logo} alt="logo" />
        </Link>
    );
}

export default BlackLogo;