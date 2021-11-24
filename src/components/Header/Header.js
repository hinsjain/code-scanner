import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div className="header">
          <NavLink exact to="/" activeClassName="active">Upload</NavLink>
          <NavLink exact to="/scanner" activeClassName="active">Scanner</NavLink>
          <NavLink exact to="/tracker" activeClassName="active">Tracker</NavLink>
        </div>
    )
}

export default Header