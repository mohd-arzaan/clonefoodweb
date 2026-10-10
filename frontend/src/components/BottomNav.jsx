import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/bottom-nav.css'

const BottomNav = () => {
  const [user, setUser] = useState(null)
  const [partner, setPartner] = useState(null)
  const navigate = useNavigate()

  const checkAuth = async () => {
    // User check
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true })
      setUser(res.data.user)
      setPartner(null)
      return
    } catch (err) {}
    // Partner check
    try {
      const res = await axios.get("http://localhost:3000/api/auth/partner/me", { withCredentials: true })
      setPartner(res.data.partner)
      setUser(null)
    } catch (err) {
      setUser(null)
      setPartner(null)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const handleUserLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
      setUser(null)
      navigate('/user/login')
    } catch (err) { console.log(err) }
  }

  const handlePartnerLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/partner/logout", {}, { withCredentials: true })
      setPartner(null)
      navigate('/food-partner/login')
    } catch (err) { console.log(err) }
  }

  return (
    <nav className="bottom-nav" role="navigation">
      <div className="bottom-nav__inner">
        {/* HOME */}
        <NavLink to="/" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10.5 12 3l9 7.5"/>
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        {/* SAVED */}
        <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Saved</span>
        </NavLink>

        {/* CREATE FOOD — sirf partner ke liye */}
        {partner && (
          <NavLink to="/create-food" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
            <span className="bottom-nav__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </span>
            <span className="bottom-nav__label">Create</span>
          </NavLink>
        )}

        {/* USER LOGIN/LOGOUT */}
        {user ? (
          <button onClick={handleUserLogout} className="bottom-nav__item" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="bottom-nav__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span className="bottom-nav__label">Logout</span>
          </button>
        ) : partner ? (
          <button onClick={handlePartnerLogout} className="bottom-nav__item" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="bottom-nav__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span className="bottom-nav__label">Logout</span>
          </button>
        ) : (
          <NavLink to="/user/login" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
            <span className="bottom-nav__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </span>
            <span className="bottom-nav__label">Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default BottomNav