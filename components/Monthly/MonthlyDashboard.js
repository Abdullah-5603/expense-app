'use client'

import { useState, useEffect } from 'react'
import MonthSelector from './MonthSelector'
import MonthlyExpenseList from './MonthlyExpenseList'
import ExpenseForm from '../ExpenseForm'
import { getCurrentMonthYear } from '@/utils/helper'
import MonthlySummary from './MonthlySummery'

import './styles/monthlyDashboard.scss'

export default function MonthlyDashboard({ initialData, initialMonth }) {
  
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || getCurrentMonthYear())
  const [expenses, setExpenses] = useState(initialData.expenses)
  const [total, setTotal] = useState(initialData.total)
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)

  const refreshData = async (month = selectedMonth) => {
    try {
      const response = await fetch(`/api/expenses?month=${month}`)
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses)
        setTotal(newTotal)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    }
  }

  useEffect(() => {
    refreshData()
  }, [selectedMonth])

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    setEditingId(null)
    setEditingExpense(null)
  }

  const handleAdd = async (data) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date: data.date || new Date().toISOString() }),
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal, monthYear } = await response.json()
        setExpenses(newExpenses)
        setTotal(newTotal)
        if (monthYear !== selectedMonth) {
          setSelectedMonth(monthYear)
        }
      }
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal, monthYear } = await response.json()
        setExpenses(newExpenses)
        setTotal(newTotal)
        setEditingId(null)
        setEditingExpense(null)
        
        if (monthYear !== selectedMonth) {
          setSelectedMonth(monthYear)
        }
      }
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses)
        setTotal(newTotal)
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const handleEdit = (expense) => {
    setEditingId(expense._id)
    setEditingExpense({
      ...expense,
      date: expense.date.split('T')[0] // Format for date input
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingExpense(null)
  }

  return (
    <div className="monthly-dashboard">
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      
      <MonthlySummary
        monthYear={selectedMonth}
        total={total}
        expenseCount={expenses.length}
      />
      
      <ExpenseForm
        onSubmit={editingId ? (data) => handleUpdate(editingId, data) : handleAdd}
        initialData={editingExpense}
        isEditing={!!editingId}
        onCancel={handleCancel}
        includeDate={true}
      />
      
      <MonthlyExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}