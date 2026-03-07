'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

// AppLayout Component
// BEM: .dashboard-shell
// Elements: __sidebar, __main, __header, __content, __overlay, __hamburger
// Modifiers: --sidebar-collapsed, --sidebar-open
export default function AppLayout({ 
  children, 
  user, 
  title = 'Dashboard',
  onAddExpense,
  onLogout,
  onMonthChange,
  showAddButton = true
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleOverlayClick = () => {
    setSidebarOpen(false)
  }

  const handleNavigate = () => {
    // Close mobile sidebar when navigating
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <aside 
        className={`
          dashboard-shell__sidebar 
          ${sidebarCollapsed ? 'dashboard-shell__sidebar--collapsed' : ''}
          ${sidebarOpen ? 'dashboard-shell__sidebar--open' : ''}
        `}
      >
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={handleToggleSidebar}
          user={user}
          onNavigate={handleNavigate}
        />
      </aside>

      {/* Mobile Overlay */}
      <div 
        className={`dashboard-shell__overlay ${sidebarOpen ? 'dashboard-shell__overlay--visible' : ''}`}
        onClick={handleOverlayClick}
      />

      {/* Main Content Area */}
      <main className={`dashboard-shell__main ${sidebarCollapsed ? 'dashboard-shell__main--sidebar-collapsed' : ''}`}>
        {/* Header */}
        <Header 
          title={title}
          onMenuClick={handleMenuClick}
          onAddExpense={onAddExpense}
          onLogout={onLogout}
          onMonthChange={onMonthChange}
          user={user}
          showAddButton={showAddButton}
        />

        {/* Content */}
        <div className="dashboard-shell__content">
          {children}
        </div>
      </main>
    </div>
  )
}
