'use client'

// Category icons
const Icons = {
  Food: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  ),
  Transport: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  ),
  Shopping: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
  Bills: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  ),
  Entertainment: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
    </svg>
  ),
  Other: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  )
}

const categoryIcons = {
  Food: Icons.Food,
  Transport: Icons.Transport,
  Shopping: Icons.Shopping,
  Bills: Icons.Bills,
  Entertainment: Icons.Entertainment,
  Other: Icons.Other
}

const categoryColors = {
  Food: 'food',
  Transport: 'transport',
  Shopping: 'shopping',
  Bills: 'bills',
  Entertainment: 'entertainment',
  Other: 'other'
}

// CategoryBreakdown Component
// BEM: .category-breakdown
// Elements: __item, __icon, __info, __name, __count, __amount, __percentage, __bar, __bar-fill
export function CategoryBreakdown({ categories = [] }) {
  // Calculate total
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0)

  return (
    <div className="category-breakdown">
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.name] || Icons.Other
        const color = categoryColors[category.name] || 'other'
        const percentage = total > 0 ? ((category.amount / total) * 100).toFixed(0) : 0

        return (
          <div key={index} className="category-breakdown__item">
            {/* Icon */}
            <div className={`category-breakdown__icon category-breakdown__icon--${color}`}>
              <IconComponent />
            </div>

            {/* Info */}
            <div className="category-breakdown__info">
              <span className="category-breakdown__name">{category.name}</span>
              <span className="category-breakdown__count">{category.count} expenses</span>
            </div>

            {/* Amount */}
            <span className="category-breakdown__amount">
              ${category.amount.toFixed(2)}
            </span>

            {/* Percentage */}
            <span className="category-breakdown__percentage">{percentage}%</span>

            {/* Progress Bar */}
            <div className="category-breakdown__bar">
              <div 
                className="category-breakdown__bar-fill" 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ChartPlaceholder Component
// BEM: .charts-section, .chart-grid, .chart-card
// Elements: __header, __title, __tabs, __tab, __content, __placeholder
export function ChartPlaceholder({ 
  title = 'Spending Overview',
  subtitle,
  type = 'bar' // 'bar' or 'donut'
}) {
  return (
    <section className="charts-section">
      {/* Header */}
      <div className="charts-section__header">
        <h2 className="charts-section__title">{title}</h2>
      </div>

      {/* Chart Grid */}
      <div className="chart-grid">
        {/* Bar Chart */}
        <div className="chart-card">
          <div className="chart-card__header">
            <h3 className="chart-card__title">Monthly Spending</h3>
          </div>
          <div className="chart-card__content">
            <div className="bar-chart">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <div 
                  key={month} 
                  className="bar-chart__bar"
                  style={{ height: `${30 + Math.random() * 60}%` }}
                  data-label={month}
                >
                  <span className="bar-chart__value">${100 + Math.floor(Math.random() * 400)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="chart-card">
          <div className="chart-card__header">
            <h3 className="chart-card__title">Category Distribution</h3>
          </div>
          <div className="chart-card__content">
            <div className="donut-chart">
              <div className="donut-chart__center">
                <span className="donut-chart__value">$2,450</span>
                <span className="donut-chart__label">Total</span>
              </div>
            </div>
            {/* Legend */}
            <div className="chart-card__legend">
              <div className="chart-card__legend-item">
                <span className="chart-card__legend-dot" style={{ background: '#08b16e' }}></span>
                Food (45%)
              </div>
              <div className="chart-card__legend-item">
                <span className="chart-card__legend-dot" style={{ background: '#f59e0b' }}></span>
                Transport (25%)
              </div>
              <div className="chart-card__legend-item">
                <span className="chart-card__legend-dot" style={{ background: '#dd3737' }}></span>
                Bills (15%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
