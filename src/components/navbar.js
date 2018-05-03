import React from 'react';
import { Link } from 'react-router-dom'

import './navbar.css';

export default () => (
    <nav className="navbar">
        <Link to="/"><h1>ReactNotes</h1></Link>
        <span className="navbar-buttons">
            <Link className="btn" to="/new">New Note</Link>
        </span>
    </nav>
)
