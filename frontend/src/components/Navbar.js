import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiMenu, HiChevronDoubleRight, HiChevronDown } from 'react-icons/hi'
import '../index.css'
import logo from '../media/logoblue.png'

const Navbar = props => {
  const { toggleMenu, isMenuOpen, setIsMenuOpen } = props

  return (
    <nav className={`navbar main-content ${isMenuOpen ? 'pushed' : ''}`}>
      <div className="navbar-logo">
        <NavLink className='a' to="/">
          {' '}
          <img src={logo} alt="Logo" className="logo-image" />
        </NavLink>
      </div>
      {/* <ul
        className={`navbar-Navlinks navbar-menu ${isMenuOpen ? 'active' : ''} ul`}
      >
        <div className="navbar-toggle  menu-arrow" onClick={toggleMenu}>
          <div className={`toggle-icon ${isMenuOpen ? 'active' : ''}`}>
            {' '}
            <HiChevronDoubleRight />
          </div>
        </div>

        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/">Home</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/about">Reminders</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink className='a' to="/terms-and-conditions">Search</NavLink>
        </li>
        <li className='li' onClick={() => toggleMenu()}>
          <NavLink  className="nov" to="/contact">
            <button className="nav-btn">Login</button>
          </NavLink>
        </li>
      </ul>
      <div className="navbar-toggle bars" onClick={() => toggleMenu()}>
        <div className={`toggle-icon `}>
          {' '}
          <HiMenu />
        </div>
      </div> */}
    </nav>
  )
}

export default Navbar
