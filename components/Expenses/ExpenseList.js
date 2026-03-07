'use client'

import { format, parseISO } from 'date-fns'

// Icons
const Icons = {
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  ),
  Delete: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  )
}

// ExpenseList Component
// BEM: .expense-section, .expense-table, .expense-cards
// Elements: __header, __title, __controls, __search, __filter, __table, __cards
export default function ExpenseList({ 
  expenses = [], 
  onEdit, 
  onDelete,
  searchQuery = '',
  onSearchChange,
  categoryFilter = 'All',
  onCategoryChange,
  categories = []
}) {
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMM dd')
    } catch {
      return dateString
    }
  }

  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`
  }

  // Get unique categories
  const allCategories = ['All', ...categories]

  return (
    <section className="expense-section">
      {/* Section Header */}
      <div className="expense-section__header">
        <h2 className="expense-section__title">Expenses</h2>
        
        <div className="expense-section__controls">
          {/* Search */}
          <div className="expense-section__search">
            <span className="expense-section__search-icon">
              <Icons.Search />
            </span>
            <input
              type="text"
              className="expense-section__search-input"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select 
            className="expense-section__filter"
            value={categoryFilter}
            onChange={(e) => onCategoryChange?.(e.target.value)}
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <table className="expense-table">
        <thead className="expense-table__head">
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="expense-table__body">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense._id || expense.id}>
                <td className="expense-table__date">
                  {formatDate(expense.date)}
                </td>
                <td className="expense-table__name">
                  {expense.name}
                </td>
                <td className="expense-table__category">
                  <span className="expense-table__badge">
                    {expense.category}
                  </span>
                </td>
                <td className="expense-table__amount expense-table__amount--expense">
                  {formatAmount(expense.amount)}
                </td>
                <td className="expense-table__actions">
                  <button 
                    className="expense-table__btn expense-table__btn--edit"
                    onClick={() => onEdit?.(expense)}
                    aria-label="Edit expense"
                  >
                    <Icons.Edit />
                  </button>
                  <button 
                    className="expense-table__btn expense-table__btn--delete"
                    onClick={() => onDelete?.(expense._id || expense.id)}
                    aria-label="Delete expense"
                  >
                    <Icons.Delete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="expense-cards">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense._id || expense.id} className="expense-cards__item">
              <div className="expense-cards__header">
                <div className="expense-cards__info">
                  <span className="expense-cards__name">{expense.name}</span>
                  <div className="expense-cards__meta">
                    <span className="expense-cards__date">
                      {formatDate(expense.date)}
                    </span>
                    <span className="expense-cards__category">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <span className="expense-cards__amount">
                  {formatAmount(expense.amount)}
                </span>
              </div>
              <div className="expense-cards__actions">
                <button 
                  className="expense-cards__btn expense-cards__btn--edit"
                  onClick={() => onEdit?.(expense)}
                >
                  <Icons.Edit />
                  Edit
                </button>
                <button 
                  className="expense-cards__btn expense-cards__btn--delete"
                  onClick={() => onDelete?.(expense._id || expense.id)}
                >
                  <Icons.Delete />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--secondary-text)' }}>
            No expenses found
          </div>
        )}
      </div>
    </section>
  )
}
