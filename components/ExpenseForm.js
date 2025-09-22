'use client'

import { useState, useEffect } from 'react'

export default function ExpenseForm({ onSubmit, initialData, isEditing = false, onCancel, includeDate = false }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setAmount(initialData.amount || '')
      setCategory(initialData.category || '')
      setDate(initialData.date || new Date().toISOString().split('T')[0])
    } else {
      setName('')
      setAmount('')
      setCategory('')
      setDate(new Date().toISOString().split('T')[0])
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !amount || !category.trim() || (includeDate && !date)) {
      alert('Please fill all required fields')
      return
    }
    
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Amount must be a positive number')
      return
    }
    
    const formData = { 
      name: name.trim(), 
      amount: numAmount, 
      category: category.trim() 
    }
    
    if (includeDate) {
      formData.date = date
    }
    
    onSubmit(formData)
    
    if (!isEditing) {
      setName('')
      setAmount('')
      setCategory('')
      if (includeDate) {
        setDate(new Date().toISOString().split('T')[0])
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        className='expense-form__input'
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount (e.g., 50.00)"
        value={amount}
        className='expense-form__input'
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />
      <input
        type="text"
        className='expense-form__input'
        placeholder="Category (e.g., Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      {includeDate && (
        <input
          type="date"
          className='expense-form__input--date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      )}
      <button className='expense-form__button expense-form--primary' type="submit">{isEditing ? 'Update' : 'Add'} Expense</button>
      {isEditing && <button className='expense-form__button expense-form__button--cancel' type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}