'use client'

import KpiCard, { KpiGrid } from './KpiCard'
import { CategoryBreakdown, ChartPlaceholder } from './Charts'

// SummarySection Component
// BEM: Uses .kpi-grid, .kpi-card, .charts-section, .category-breakdown
export default function SummarySection({ 
  totalExpenses = 0,
  expenseCount = 0,
  averageExpense = 0,
  topCategory = null,
  categories = [],
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="kpi-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="kpi-card">
            <div style={{ height: '16px', width: '40%', background: 'var(--gray-color)', borderRadius: '4px' }}></div>
            <div style={{ height: '32px', width: '60%', background: 'var(--gray-color)', borderRadius: '4px', marginTop: '8px' }}></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* KPI Cards */}
      <KpiGrid>
        <KpiCard
          label="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          subtitle="This month"
          icon="wallet"
          variant="danger"
          trend="up"
          trendValue="+12%"
        />
        <KpiCard
          label="Number of Expenses"
          value={expenseCount.toString()}
          subtitle="Transactions"
          icon="receipt"
          variant="neutral"
        />
        <KpiCard
          label="Average Expense"
          value={`$${averageExpense.toFixed(2)}`}
          subtitle="Per transaction"
          icon="trendUp"
          variant="warning"
        />
        <KpiCard
          label="Top Category"
          value={topCategory?.name || 'N/A'}
          subtitle={topCategory ? `$${topCategory.amount.toFixed(2)}` : 'No data'}
          icon="category"
          variant="success"
        />
      </KpiGrid>

      {/* Charts Section */}
      <ChartPlaceholder 
        title="Spending Overview"
        subtitle="Monthly breakdown"
      />

      {/* Category Breakdown */}
      {categories.length > 0 && (
        <section className="charts-section">
          <div className="charts-section__header">
            <h2 className="charts-section__title">Category Breakdown</h2>
          </div>
          <CategoryBreakdown categories={categories} />
        </section>
      )}
    </>
  )
}
