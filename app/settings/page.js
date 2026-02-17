'use client'

import { useState } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import { useAuth } from '@/context/AuthContext'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [currency, setCurrency] = useState('USD')

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AppLayout
      title="Settings"
      user={user}
      onAddExpense={() => {}}
      onLogout={handleLogout}
      showAddButton={false}
    >
      <div style={{ maxWidth: '600px' }}>
        {/* Profile Section */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: 'var(--primary-text)'
          }}>
            Profile
          </h2>
          
          <div style={{
            background: 'white',
            border: '1px solid var(--secondary-color)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                user?.email?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontWeight: '600', color: 'var(--primary-text)' }}>
                {user?.displayName || 'User'}
              </h3>
              <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '0.875rem' }}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: 'var(--primary-text)'
          }}>
            Preferences
          </h2>
          
          <div style={{
            background: 'white',
            border: '1px solid var(--secondary-color)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Currency */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: '500', color: 'var(--primary-text)' }}>
                  Currency
                </p>
                <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '0.8125rem' }}>
                  Select your preferred currency
                </p>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--secondary-color)',
                  borderRadius: '8px',
                  background: 'var(--gray-color)',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </div>

            {/* Notifications */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--secondary-color)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: '500', color: 'var(--primary-text)' }}>
                  Push Notifications
                </p>
                <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '0.8125rem' }}>
                  Receive notifications for new expenses
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  background: notifications ? 'var(--primary-color)' : 'var(--secondary-color)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: notifications ? '22px' : '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>

            {/* Email Updates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--secondary-color)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: '500', color: 'var(--primary-text)' }}>
                  Email Updates
                </p>
                <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '0.8125rem' }}>
                  Receive weekly expense summaries
                </p>
              </div>
              <button
                onClick={() => setEmailUpdates(!emailUpdates)}
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '14px',
                  border: 'none',
                  background: emailUpdates ? 'var(--primary-color)' : 'var(--secondary-color)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: emailUpdates ? '22px' : '2px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: 'var(--primary-text)'
          }}>
            Account
          </h2>
          
          <div style={{
            background: 'white',
            border: '1px solid var(--secondary-color)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: '1px solid var(--btn-color)',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--btn-color)',
                fontSize: '0.9375rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Sign Out
            </button>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: 'var(--primary-text)'
          }}>
            About
          </h2>
          
          <div style={{
            background: 'white',
            border: '1px solid var(--secondary-color)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: '600', color: 'var(--primary-color)', fontSize: '1.125rem' }}>
              ExpenseTrack
            </p>
            <p style={{ margin: '0 0 4px', color: 'var(--secondary-text)', fontSize: '0.8125rem' }}>
              Version 1.0.0
            </p>
            <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '0.75rem' }}>
              Personal Expense Management Dashboard
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
