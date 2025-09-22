'use client'

import { useState, useEffect } from 'react'

export default function ExpenseForm({ onSubmit, initialData, isEditing = false, onCancel }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setAmount(initialData.amount || '')
      setCategory(initialData.category || '')
    } else {
      setName('')
      setAmount('')
      setCategory('')
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !amount || !category.trim()) {
      alert('Please fill all fields')
      return
    }
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Amount must be a positive number')
      return
    }
    onSubmit({ name: name.trim(), amount: numAmount, category: category.trim() })
    if (!isEditing) {
      setName('')
      setAmount('')
      setCategory('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (e.g., 50.00)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />
      <input
        type="text"
        placeholder="Category (e.g., Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Expense</button>
      {isEditing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}
