'use client'

// EmptyState Component
// BEM: .empty-state
// Elements: __icon, __title, __description, __action
// Modifiers: --compact
export function EmptyState({ 
  title = 'No data found', 
  description = 'There are no items to display.',
  actionLabel,
  onAction,
  compact = false
}) {
  return (
    <div className={`empty-state ${compact ? 'empty-state--compact' : ''}`}>
      {/* Icon */}
      <div className="empty-state__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"/>
        </svg>
      </div>

      {/* Title */}
      <h3 className="empty-state__title">{title}</h3>

      {/* Description */}
      <p className="empty-state__description">{description}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button className="empty-state__action" onClick={onAction}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// LoadingSkeleton Component
// BEM: .loading-skeleton
// Elements: __line, __circle, __row, __card
export function LoadingSkeleton({ type = 'list', count = 5 }) {
  if (type === 'cards') {
    return (
      <div className="loading-skeleton">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="loading-skeleton__card">
            <div className="loading-skeleton__line loading-skeleton__line--medium"></div>
            <div className="loading-skeleton__line loading-skeleton__line--short"></div>
            <div className="loading-skeleton__line loading-skeleton__line--long"></div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'kpi') {
    return (
      <div className="kpi-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="kpi-card">
            <div className="loading-skeleton__line loading-skeleton__line--short" style={{ width: '40%' }}></div>
            <div className="loading-skeleton__line loading-skeleton__line--medium" style={{ width: '60%', height: '28px' }}></div>
          </div>
        ))}
      </div>
    )
  }

  // Default: table/list
  return (
    <div className="loading-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="loading-skeleton__row">
          <div className="loading-skeleton__circle"></div>
          <div className="loading-skeleton__line loading-skeleton__line--medium"></div>
          <div className="loading-skeleton__line loading-skeleton__line--short"></div>
          <div className="loading-skeleton__line loading-skeleton__line--short"></div>
        </div>
      ))}
    </div>
  )
}

// ErrorState Component
// BEM: .error-state
// Elements: __icon, __title, __message, __action
export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'An error occurred while loading this content.',
  onRetry
}) {
  return (
    <div className="error-state">
      {/* Icon */}
      <div className="error-state__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>

      {/* Title */}
      <h3 className="error-state__title">{title}</h3>

      {/* Message */}
      <p className="error-state__message">{message}</p>

      {/* Retry Button */}
      {onRetry && (
        <button className="error-state__action" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

// Toast Notification Component
// BEM: .toast
// Elements: __icon, __message, __close
// Modifiers: --visible, --success, --error
export function Toast({ 
  message, 
  type = 'success', 
  isVisible, 
  onClose 
}) {
  return (
    <div className={`toast toast--${type} ${isVisible ? 'toast--visible' : ''}`}>
      {/* Icon */}
      <div className="toast__icon">
        {type === 'success' ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        )}
      </div>

      {/* Message */}
      <p className="toast__message">{message}</p>

      {/* Close Button */}
      <button className="toast__close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  )
}
