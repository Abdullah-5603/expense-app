'use client'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No expenses found.</p>
  }

  return (
    <ul className="expense-list">
      {expenses.map((exp) => (
        <li key={exp._id} className="expense-item">
          <div className="details">
            <span>{exp.name}</span>
            <span className="amount">${exp.amount.toFixed(2)}</span>
            <span className="category">{exp.category}</span>
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
