'use client'

import { useState, useEffect } from 'react'

// Icons
const Icons = {
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
  )
}

// Convert "2026-03" to "March 2026"
function formatMonthDisplay(monthStr) {
  if (!monthStr || typeof monthStr !== 'string') return ''
  
  const [year, month] = monthStr.split('-')
  const monthIndex = parseInt(month) - 1
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  return `${monthNames[monthIndex]} ${year}`
}

// Header Component
// BEM: .header
// Elements: __left, __title, __right, __search, __action, __profile
export default function Header({ 
  title = 'Dashboard', 
  onMenuClick, 
  onAddExpense,
  onLogout,
  onMonthChange,
  user,
  showAddButton = true,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [availableMonths, setAvailableMonths] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [isLoadingMonths, setIsLoadingMonths] = useState(true)

  // Fetch available months from API
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        setIsLoadingMonths(true)
        const response = await fetch('/api/expenses/months')
        if (response.ok) {
          const data = await response.json()
          const months = data.months || []
          setAvailableMonths(months)
          
          // Set the first month as default if available
          if (months.length > 0) {
            setSelectedMonth(months[0])
          }
        } else {
          console.error('Failed to fetch months')
        }
      } catch (error) {
        console.error('Error fetching months:', error)
      } finally {
        setIsLoadingMonths(false)
      }
    }

    fetchMonths()
  }, [])

  // Call parent's fetchExpenses when month changes
  useEffect(() => {
    if (selectedMonth && onMonthChange) {
      onMonthChange(selectedMonth)
    }
  }, [selectedMonth, onMonthChange])

  const handlePrevMonth = () => {
    const currentIndex = availableMonths.indexOf(selectedMonth)
    if (currentIndex < availableMonths.length - 1) {
      setSelectedMonth(availableMonths[currentIndex + 1])
    }
  }

  const handleNextMonth = () => {
    const currentIndex = availableMonths.indexOf(selectedMonth)
    if (currentIndex > 0) {
      setSelectedMonth(availableMonths[currentIndex - 1])
    }
  }

  const currentIndex = availableMonths.indexOf(selectedMonth)
  const canGoPrev = currentIndex < availableMonths.length - 1
  const canGoNext = currentIndex > 0

  return (
    <header className="dashboard-shell__header">
      {/* Left Section */}
      <div className="header__left">
        {/* Hamburger (mobile) */}
        <button 
          className="header__hamburger"
          onClick={onMenuClick}
          aria-label="Toggle menu"
          title="Toggle menu"
        >
          <Icons.Menu />
        </button>

        <h1 className="header__title">{title}</h1>
      </div>

      {/* Center: Month Selector */}
      <div className="month-selector">
        <button 
          className="month-selector__btn"
          onClick={handleNextMonth}
          disabled={!canGoNext || isLoadingMonths}
          aria-label="Next month (more recent)"
          title="Next month (more recent)"
        >
          <Icons.ChevronLeft />
        </button>
        
        <select 
          className="month-selector__current"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          aria-label="Select month"
          disabled={isLoadingMonths || availableMonths.length === 0}
        >
          {availableMonths.length === 0 && (
            <option value="">Loading months...</option>
          )}
          {availableMonths.map(month => (
            <option key={month} value={month}>
              {formatMonthDisplay(month)}
            </option>
          ))}
        </select>
        
        <button 
          className="month-selector__btn"
          onClick={handlePrevMonth}
          disabled={!canGoPrev || isLoadingMonths}
          aria-label="Previous month (older)"
          title="Previous month (older)"
        >
          <Icons.ChevronRight />
        </button>
      </div>

      {/* Right Section */}
      <div className="header__right">
        {/* Add Expense Button */}
        {showAddButton && (
          <button 
            className="header__action header__action--primary"
            onClick={onAddExpense}
            title="Add Expense"
            aria-label="Add Expense"
          >
            <Icons.Plus />
            <span className="header__action-label">Add Expense</span>
          </button>
        )}

        {/* Notifications */}
        <button 
          className="header__action" 
          aria-label="Notifications"
          title="Notifications"
        >
          <Icons.Bell />
          <span className="header__action-badge"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="header__profile-container">
          <button 
            className={`header__profile ${showProfileMenu ? 'header__profile--open' : ''}`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Profile menu"
            aria-expanded={showProfileMenu}
          >
            <div className="header__profile-avatar">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} />
              ) : (
                user?.email?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <span className="header__profile-name">{user?.displayName || 'User'}</span>
            <Icons.ChevronDown />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="profile-menu profile-menu--open">
              <button 
                className="profile-menu__item" 
                onClick={() => {
                  onLogout()
                  setShowProfileMenu(false)
                }}
              >
                <Icons.LogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}