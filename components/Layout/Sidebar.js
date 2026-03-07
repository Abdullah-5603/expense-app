'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Icons as simple SVG components
const Icons = {
  Logo: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
  ),
  Wallet: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
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
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  )
}

// Navigation items with routes
const navItems = [
  { 
    path: '/dashboard', 
    icon: Icons.Dashboard, 
    label: 'Dashboard',
    active: false 
  },
  { 
    path: '/expenses', 
    icon: Icons.Wallet, 
    label: 'Expenses',
    active: false
  },
  { 
    path: '/settings', 
    icon: Icons.Settings, 
    label: 'Settings',
    active: false 
  }
]

// Sidebar Component
// BEM: .sidebar
// Elements: __logo, __nav, __link, __user, __toggle
export default function Sidebar({ collapsed = false, onToggle, user, onNavigate }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleNavClick = (path) => {
    router.push(path)
    onNavigate?.()
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Icons.Logo />
        </div>
        <span className="sidebar__logo-text">ExpenseTrack</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navItems.map((item, index) => (
          <button
            key={item.path}
            className={`sidebar__link ${pathname === item.path ? 'sidebar__link--active' : ''} ${collapsed ? 'sidebar__link--collapsed' : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="sidebar__link-icon">
              <item.icon />
            </span>
            <span className="sidebar__link-text">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className={`sidebar__user ${collapsed ? 'sidebar__user--collapsed' : ''}`}>
        <div className="sidebar__user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            user?.email?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">{user?.displayName || 'User'}</span>
          <span className="sidebar__user-email">{user?.email || 'user@example.com'}</span>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        className={`sidebar__toggle ${collapsed ? 'sidebar__toggle--collapsed' : ''}`}
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
      </button>
    </aside>
  )
}
