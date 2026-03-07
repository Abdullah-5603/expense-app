'use client'

import Modal from './Modal'

// ConfirmDeleteModal Component
// Uses Modal component with custom footer
export default function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Delete Expense',
  message = 'Are you sure you want to delete this expense? This action cannot be undone.',
  itemName 
}) {
  const handleConfirm = () => {
    onConfirm?.()
    onClose?.()
  }

  const footer = (
    <>
      <button 
        className="expense-form__btn expense-form__btn--secondary"
        onClick={onClose}
      >
        Cancel
      </button>
      <button 
        className="expense-form__btn expense-form__btn--danger"
        onClick={handleConfirm}
      >
        Delete
      </button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        {/* Warning Icon */}
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          background: 'rgba(221, 55, 55, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <svg viewBox="0 0 24 24" fill="#dd3737" width="32" height="32">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>

        {/* Message */}
        <p style={{ 
          color: 'var(--secondary-text)', 
          margin: '0 0 8px',
          fontSize: '0.9375rem'
        }}>
          {message}
        </p>

        {/* Item Name (if provided) */}
        {itemName && (
          <p style={{ 
            color: 'var(--primary-text)', 
            fontWeight: '600',
            margin: 0,
            fontSize: '1rem'
          }}>
            "{itemName}"
          </p>
        )}
      </div>
    </Modal>
  )
}
