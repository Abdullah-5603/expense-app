'use client'

import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

export default function ClientDashboard({ initialData }) {
    const [expenses, setExpenses] = useState(initialData.expenses)
    const [total, setTotal] = useState(initialData.total)
    const [filter, setFilter] = useState('All')
    const [editingId, setEditingId] = useState(null)
    const [editingExpense, setEditingExpense] = useState(null)

    // Refetch data from API (for sync after SSR)
    const refreshData = async () => {
        const res = await fetch('/api/expenses')
        if (res.ok) {
            const { expenses: newExpenses, total: newTotal } = await res.json()
            setExpenses(newExpenses)
            setTotal(newTotal)
        }
    }

    useEffect(() => {
        refreshData() // Ensure client-side sync on mount
    }, [])

    const handleAdd = async (data) => {
        const res = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (res.ok) {
            const { expenses, total } = await res.json()
            setExpenses(expenses)
            setTotal(total)
        }
    }

    const handleUpdate = async (id, data) => {
        const res = await fetch(`/api/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (res.ok) {
            const { expenses, total } = await res.json()
            setExpenses(expenses)
            setTotal(total)
            setEditingId(null)
            setEditingExpense(null)
        }
    }

    const handleDelete = async (id) => {
        const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
        if (res.ok) {
            const { expenses, total } = await res.json()
            setExpenses(expenses)
            setTotal(total)
        }
    }

    const handleEdit = (expense) => {
        setEditingId(expense._id)
        setEditingExpense(expense)
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditingExpense(null)
    }

    const filteredExpenses = filter === 'All' ? expenses : expenses.filter((e) => e.category === filter)
    const categories = ['All', ...new Set(expenses.map((e) => e.category).sort())]

    return (
        <div className="dashboard">
            <h1 className='dashboard__title'>Expenses Dashboard</h1>
            <div className="dashboard__total">Total Expenses: ${total.toFixed(2)}</div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <ExpenseForm
                onSubmit={editingId ? (data) => handleUpdate(editingId, data) : handleAdd}
                initialData={editingExpense}
                isEditing={!!editingId}
                onCancel={handleCancel}
            />
            <ExpenseList expenses={filteredExpenses} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}
