'use client'

import { formatMonthYear } from '@/utils/helper';

import './styles/monthlySummery.scss';


export default function MonthlySummary({ monthYear, total, expenseCount, categories, setSelectedCategory }) {
  return (
    <div className="monthly-summary">
      <h2 className='monthly-summary__title'>{formatMonthYear(monthYear)}</h2>
      <div className="monthly-summary__stats">
        <div className="monthly-summary__stat">
          <span className="monthly-summary__stat-label">Total Expenses</span>
          <span className="monthly-summary__stat-value">${total.toFixed(2)}</span>
        </div>
        <div className="monthly-summary__stat">
          <span className="monthly-summary__stat-label">Number of Expenses</span>
          <span className="monthly-summary__stat-value">{expenseCount}</span>
        </div>
        <div className="monthly-summary__stat">
          <span className="monthly-summary__stat-label">Average per Expense</span>
          <span className="monthly-summary__stat-value">
            ${expenseCount > 0 ? (total / expenseCount).toFixed(2) : '0.00'}
          </span>
        </div>
        <div className="monthly-summary__stat">
          <span className="monthly-summary__stat-label">Sort by category</span>
          <select className="monthly-summary__category-select">
            {
              ['All',...categories].map((category, index) => (
                <option key={`${category}-${index}`} value={category} onClick={() => setSelectedCategory(category)}>{category}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
}