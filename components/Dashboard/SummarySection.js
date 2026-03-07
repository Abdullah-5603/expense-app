'use client'

import { CategoryBreakdown, ChartPlaceholder } from './Charts'
import KpiCard, { KpiGrid } from './KpiCard'

// SummarySection Component with Dynamic Data
// BEM: Uses .kpi-grid, .kpi-card, .charts-section, .category-breakdown
export default function SummarySection({
  totalExpenses = 0,
  expenseCount = 0,
  averageExpense = 0,
  topCategory = null,
  categories = [],
  monthlyData = [],
  isLoading = false,
  monthlyIncome = null,
  currentMonthExpenses = 0
}) {
  if (isLoading) {
    return (
      <>
        {/* KPI Cards Skeleton */}
        <div className="kpi-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="kpi-card">
              <div style={{ height: '16px', width: '40%', background: 'var(--gray-color)', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
              <div style={{ height: '32px', width: '60%', background: 'var(--gray-color)', borderRadius: '4px', marginTop: '8px', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="chart-grid">
          <div className="chart-card">
            <div className="chart-card__content" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '160px', padding: '16px 0' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{
                  width: '24px',
                  height: '40%',
                  background: 'var(--gray-color)',
                  borderRadius: '4px 4px 0 0',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
              ))}
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card__content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--gray-color)',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
            </div>
          </div>
        </div>
      </>
    )
  }

  // Calculate remaining balance
  const remainingBalance = monthlyIncome !== null ? monthlyIncome - currentMonthExpenses : null

  return (
    <>
      {/* Monthly Income & Expenses Summary */}
      {monthlyIncome !== null && (
        <div className="kpi-grid">
          <KpiCard
            label="Monthly Income"
            value={`${monthlyIncome.toFixed(2)}`}
            subtitle="Current month"
            icon="income"
            variant="success"
          />
          <KpiCard
            label="Monthly Expenses"
            value={`${currentMonthExpenses.toFixed(2)}`}
            subtitle="Current month"
            icon="expenses"
            variant="danger"
          />
          <KpiCard
            label="Remaining Balance"
            value={remainingBalance >= 0 ? `${remainingBalance.toFixed(2)}` : `-${Math.abs(remainingBalance).toFixed(2)}`}
            subtitle={remainingBalance >= 0 ? 'Available' : 'Over budget'}
            icon={remainingBalance >= 0 ? 'trendUp' : 'trendDown'}
            variant={remainingBalance >= 0 ? 'success' : 'danger'}
          />
        </div>
      )}

      {/* KPI Cards */}
      <KpiGrid>
        <KpiCard
          label="Total Expenses"
          value={`${totalExpenses.toFixed(2)}`}
          subtitle="All time"
          icon="wallet"
          variant="danger"
        />
        <KpiCard
          label="Number of Expenses"
          value={expenseCount.toString()}
          subtitle="All time"
          icon="receipt"
          variant="neutral"
        />
        <KpiCard
          label="Average Expense"
          value={`${averageExpense.toFixed(2)}`}
          subtitle="All time"
          icon="trendUp"
          variant="warning"
        />
        <KpiCard
          label="Top Category"
          value={topCategory?.name || 'N/A'}
          subtitle={topCategory ? `${topCategory.amount?.toFixed(2)}` : 'No data'}
          icon="category"
          variant="success"
        />
      </KpiGrid>

      {/* Charts Section with Dynamic Data */}
      <ChartPlaceholder
        title="Spending Overview"
        monthlyData={monthlyData}
        categoryData={categories}
        isLoading={isLoading}
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
