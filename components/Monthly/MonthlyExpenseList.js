'use client'

import { format, parseISO } from 'date-fns'

export default function MonthlyExpenseList({ expenses, onEdit, onDelete }) {
    if (expenses.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666' }}>No expenses for this month.</p>
    }

    return (
        <ul className="expense-list">
            {expenses.map((exp) => (
                <li key={exp._id} className="expense-list__item">
                    <div className="expense-list__details">
                        <div className="expense-list__date">{format(parseISO(exp.date), 'MMM dd')}</div>
                        <div className="expense-list__info">
                            <span className="expense-list__name">{exp.name}</span>
                            <span className="expense-list__category">{exp.category}</span>
                        </div>
                        <span className="expense-list__amount">${exp.amount.toFixed(2)}</span>
                    </div>
                    <div className="expense-list__actions">
                        <button className="expense-list__action-button expense-list__action-button--edit" onClick={() => onEdit(exp)}>Edit</button>
                        <button className="expense-list__action-button expense-list__action-button--delete" onClick={() => onDelete(exp._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}