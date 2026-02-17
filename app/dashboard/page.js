'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import SummarySection from '@/components/Dashboard/SummarySection'
import ExpenseList from '@/components/Expenses/ExpenseList'
import ExpenseForm from '@/components/Expenses/ExpenseForm'
import Modal from '@/components/UI/Modal'
import ConfirmDeleteModal from '@/components/UI/ConfirmDeleteModal'
import { EmptyState, LoadingSkeleton } from '@/components/UI/States'
import { useAuth } from '@/context/AuthContext'
import { getCurrentMonthYear } from '@/utils/helper'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const currentMonth = getCurrentMonthYear()

  useEffect(() => {
    if (user?.email) {
      fetchExpenses()
    }
  }, [user?.email])

  const fetchExpenses = async () => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/expenses?month=${currentMonth}&email=${user.email}`)
      if (response.ok) {
        const { expenses: data, total: totalAmount } = await response.json()
        setExpenses(data || [])
        setTotal(totalAmount || 0)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique categories
  const categories = [...new Set(expenses.map(e => e.category))]

  // Calculate category breakdown
  const categoryBreakdown = categories.map(cat => ({
    name: cat,
    amount: expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
    count: expenses.filter(e => e.category === cat).length
  })).sort((a, b) => b.amount - a.amount)

  const topCategory = categoryBreakdown[0] || null

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
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Error adding expense:', error)
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

  const handleUpdate = async (id, data) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const { expenses: newExpenses, total: newTotal } = await response.json()
        setExpenses(newExpenses || [])
        setTotal(newTotal || 0)
        setEditingId(null)
        setEditingExpense(null)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error('Error updating expense:', error)
    }
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

  return (
    <AppLayout
      title="Dashboard"
      user={user}
      onAddExpense={handleAddExpenseClick}
      onLogout={handleLogout}
      showAddButton={true}
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

      {/* Recent Expenses List */}
      {isLoading ? (
        <LoadingSkeleton type="cards" count={3} />
      ) : expenses.length === 0 ? (
        <EmptyState
          title="No expenses yet"
          description="Start tracking your expenses by adding your first one."
          actionLabel="Add Expense"
          onAction={handleAddExpenseClick}
        />
      ) : (
        <ExpenseList
          expenses={filteredExpenses.slice(0, 5)} // Show only recent 5
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter="All"
          onCategoryChange={() => {}}
          categories={categories}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingId ? 'Edit Expense' : 'Add New Expense'}
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
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={editingExpense?.name}
      />
    </AppLayout>
  )
}
