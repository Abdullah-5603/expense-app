'use client'

// Icons
const Icons = {
  Wallet: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  ),
  TrendDown: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
    </svg>
  ),
  Receipt: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  ),
  TrendingDown: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"/>
    </svg>
  ),
  Category: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l-5.5 9h11z"/>
      <circle cx="17.5" cy="17.5" r="4.5"/>
      <path d="M3 13.5h8v8H3z"/>
    </svg>
  ),
  Percent: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.5858 3.99992L19.9999 5.41408L5.41666 19.9974L4.0025 18.5832zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  )
}

// Icon mapping
const iconMap = {
  wallet: Icons.Wallet,
  trendUp: Icons.TrendUp,
  trendDown: Icons.TrendingDown,
  receipt: Icons.Receipt,
  category: Icons.Category,
  percent: Icons.Percent
}

// KpiCard Component
// BEM: .kpi-card
// Elements: __header, __icon, __trend, __label, __value, __subtitle
// Modifiers: --success, --warning, --danger, --neutral, --mini
export default function KpiCard({ 
  label, 
  value, 
  subtitle, 
  trend, 
  trendValue,
  icon = 'wallet',
  variant = 'neutral',
  mini = false
}) {
  const IconComponent = iconMap[icon] || Icons.Wallet
  
  return (
    <div className={`kpi-card ${mini ? 'kpi-card--mini' : ''} kpi-card--${variant}`}>
      {/* Header */}
      <div className="kpi-card__header">
        {/* Icon */}
        <div className={`kpi-card__icon kpi-card__icon--${variant}`}>
          <IconComponent />
        </div>
        
        {/* Trend Indicator */}
        {trend && (
          <div className={`kpi-card__trend kpi-card__trend--${trend}`}>
            {trend === 'up' ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Label */}
      <h3 className="kpi-card__label">{label}</h3>

      {/* Value */}
      <p className="kpi-card__value">{value}</p>

      {/* Subtitle */}
      {subtitle && (
        <p className="kpi-card__subtitle">{subtitle}</p>
      )}
    </div>
  )
}

// KpiGrid Component
// BEM: .kpi-grid
export function KpiGrid({ children }) {
  return <div className="kpi-grid">{children}</div>
}
