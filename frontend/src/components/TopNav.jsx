import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/top-nav.css'

const TopNav = () => {
  return (
    <nav className="top-nav">
      <Link to="/" className="top-nav__logo">🍔 FoodApp</Link>
      <div className="top-nav__links">
        <Link to="/user/register">User Register</Link>
        <Link to="/food-partner/register">Partner Register</Link>
        <Link to="/food-partner/login">Partner Login</Link>
      </div>
    </nav>
  )
}

export default TopNav