'use client'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No expenses found.</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map((exp) => (
        <li key={exp._id} className="expense-list__item">
          <div className="expense-list__details">
            <span className="expense-list__name">{exp.name}</span>
            <span className="expense-list__amount">${exp.amount.toFixed(2)}</span>
            <span className="expense-list__category">{exp.category}</span>
          </div>
          <div className="actions">
            <button onClick={() => onEdit(exp)}>Edit</button>
            <button onClick={() => onDelete(exp._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
