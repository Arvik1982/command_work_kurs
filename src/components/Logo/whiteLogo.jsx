// import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function WhiteLogo({ route = '/' }) {
    return (
        <Link to={route}>
            <img src={logo} alt="logo" />
        </Link>
    );
}

export default WhiteLogo;
