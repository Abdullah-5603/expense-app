'use client'

import { useEffect } from 'react'

// Icons
const Icons = {
  Close: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  )
}

// Modal Component
// BEM: .modal
// Elements: __backdrop, __content, __header, __title, __close, __body, __footer
// Modifiers: --open
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
      {/* Backdrop */}
      <div className="modal__backdrop" onClick={onClose} />
      
      {/* Content */}
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Header */}
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{title}</h2>
          <button 
            className="modal__close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icons.Close />
          </button>
        </div>

        {/* Body */}
        <div className="modal__body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
