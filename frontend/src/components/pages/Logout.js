import { Link } from "react-router-dom";
import React from 'react';
import Login from "./Login";

const Logout = () => {

    return (
        <div>
            <nav>
                <ul style={{listStyleType:'none',padding:0}}>
                    <li><Link to="/" style={{textDecoration:'none',color:'inherit'}} element={<Login/>}>Log out</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Logout;