'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import SummarySection from '@/components/Dashboard/SummarySection'
import ExpenseList from '@/components/Expenses/ExpenseList'
import ExpenseForm from '@/components/Expenses/ExpenseForm'
import Modal from '@/components/UI/Modal'
import ConfirmDeleteModal from '@/components/UI/ConfirmDeleteModal'
import { EmptyState, LoadingSkeleton } from '@/components/UI/States'
import { getCurrentMonthYear } from '@/utils/helper'
import { useAuth } from '@/context/AuthContext'

export default function MonthlyDashboard({ initialData, initialMonth }) {
  const { user, logout } = useAuth()
  
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || getCurrentMonthYear())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expenses, setExpenses] = useState(initialData?.expenses || [])
  const [total, setTotal] = useState(initialData?.total || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique categories from expenses
  const categories = [...new Set(expenses.map(e => e.category))]

  // Calculate category breakdown for summary
  const categoryBreakdown = categories.map(cat => ({
    name: cat,
    amount: expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
    count: expenses.filter(e => e.category === cat).length
  })).sort((a, b) => b.amount - a.amount)

  const topCategory = categoryBreakdown[0] || null

  const refreshData = async (month = selectedMonth, category = selectedCategory) => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/expenses?month=${month}&email=${user.email}&category=${category}`)
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email) {
      refreshData()
    }
  }, [selectedMonth, selectedCategory, user?.email])

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    setEditingId(null)
    setEditingExpense(null)
  }

  const handleAddExpenseClick = () => {
    setEditingId(null)
    setEditingExpense(null)
    setIsModalOpen(true)
  }

  const handleAdd = async (data) => {
    if (!user?.email) return
    
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date: data.date || new Date().toISOString(), email: user.email }),
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal, monthYear } = await response.json()
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
        setIsModalOpen(false)
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
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
        setEditingId(null)
        setEditingExpense(null)
        setIsModalOpen(false)
        
        if (monthYear !== selectedMonth) {
          setSelectedMonth(monthYear)
        }
      }
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const handleEdit = (expense) => {
    setEditingId(expense._id)
    setEditingExpense({
      ...expense,
      date: expense.date.split('T')[0]
    })
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id) => {
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    
    try {
      const response = await fetch(`/api/expenses/${deletingId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    } finally {
      setDeletingId(null)
      setIsDeleteModalOpen(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingExpense(null)
    setIsModalOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  // Filter expenses by search query
  const filteredExpenses = searchQuery
    ? expenses.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : expenses

  // Get unique categories for filter
  const allCategories = ['All', ...categories]

  const modalFooter = null

  return (
    <AppLayout
      title={`${selectedMonth} Expenses`}
      user={user}
      onAddExpense={handleAddExpenseClick}
      onLogout={handleLogout}
    >
      {/* Summary Section with KPI Cards */}
      <SummarySection
        totalExpenses={total}
        expenseCount={expenses.length}
        averageExpense={expenses.length > 0 ? total / expenses.length : 0}
        topCategory={topCategory}
        categories={categoryBreakdown}
        isLoading={isLoading}
      />

      {/* Expense List */}
      {isLoading ? (
        <LoadingSkeleton type="cards" count={5} />
      ) : expenses.length === 0 ? (
        <EmptyState
          title="No expenses yet"
          description="Start tracking your expenses by adding your first one."
          actionLabel="Add Expense"
          onAction={handleAddExpenseClick}
        />
      ) : (
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingId ? 'Edit Expense' : 'Add New Expense'}
        footer={modalFooter}
      >
        <ExpenseForm
          onSubmit={editingId ? (data) => handleUpdate(editingId, data) : handleAdd}
          initialData={editingExpense}
          isEditing={!!editingId}
          onCancel={handleCancel}
          includeDate={true}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setDeletingId(null)
        }}
        onConfirm={handleDelete}
        itemName={expenses.find(e => e._id === deletingId)?.name}
      />
    </AppLayout>
  )
}
