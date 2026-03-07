'use client'

import { useState, useEffect, useCallback } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import ExpenseList from '@/components/Expenses/ExpenseList'
import ExpenseForm from '@/components/Expenses/ExpenseForm'
import Modal from '@/components/UI/Modal'
import ConfirmDeleteModal from '@/components/UI/ConfirmDeleteModal'
import { EmptyState, LoadingSkeleton } from '@/components/UI/States'
import { useAuth } from '@/context/AuthContext'
import { getCurrentMonthYear } from '@/utils/helper'

export default function ExpensesPage() {
  const { user, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch expenses when month or category changes
  const fetchExpenses = useCallback(async () => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      // Build query string
      const params = new URLSearchParams()
      params.append('month', selectedMonth)
      params.append('email', user.email)
      
      // Only add category filter if not "All"
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory)
      }
      
      const response = await fetch(`/api/expenses?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data.expenses || [])
        setTotal(data.total || 0)
      } else {
        console.error('Failed to fetch expenses')
        setExpenses([])
        setTotal(0)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setExpenses([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }, [user?.email, selectedMonth, selectedCategory])

  useEffect(() => {
    if (user?.email) {
      fetchExpenses()
    }
  }, [fetchExpenses, user?.email])

  // Get unique categories from current expenses for the filter
  const categories = [...new Set(expenses.map(e => e.category))]
  const allCategories = ['All', ...categories]

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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
        
        // Update month if expense was added to different month
        if (result.monthYear && result.monthYear !== selectedMonth) {
          setSelectedMonth(result.monthYear)
        }
        
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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
        
        // Update month if expense was moved to different month
        if (result.monthYear && result.monthYear !== selectedMonth) {
          setSelectedMonth(result.monthYear)
        }
        
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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
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

  // Get expense being deleted for the confirmation modal
  const getDeletingExpenseName = () => {
    const expense = expenses.find(e => e._id === deletingId)
    return expense?.name || 'this expense'
  }

  // Filter by search query (client-side)
  const filteredExpenses = searchQuery
    ? expenses.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : expenses

  // Format month for display
  const formatMonth = (month) => {
    return month // Already formatted from API
  }

  // Handle month change from header
  const handleMonthChange = (month) => {
    setSelectedMonth(month)
  }

  return (
    <AppLayout
      title={`Expenses - ${formatMonth(selectedMonth)}`}
      user={user}
      onAddExpense={handleAddExpenseClick}
      onLogout={handleLogout}
      onMonthChange={handleMonthChange}
      showAddButton={true}
    >
      {/* Filters */}
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 16px',
            border: '1px solid var(--secondary-color)',
            borderRadius: '8px',
            background: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer',
            minWidth: '140px'
          }}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Total display */}
        <div style={{
          marginLeft: 'auto',
          padding: '8px 16px',
          background: 'var(--gray-color)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'var(--secondary-text)'
        }}>
          Total: <strong style={{ color: 'var(--btn-color)' }}>${total.toFixed(2)}</strong>
        </div>
      </div>

      {/* Expense List */}
      {isLoading ? (
        <LoadingSkeleton type="list" count={8} />
      ) : expenses.length === 0 ? (
        <EmptyState
          title="No expenses found"
          description={
            selectedMonth !== getCurrentMonthYear() || selectedCategory !== 'All'
              ? `No expenses found for ${selectedMonth}${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}. Try adjusting your filters.`
              : "You haven't added any expenses this month."
          }
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
        itemName={getDeletingExpenseName()}
      />
    </AppLayout>
  )
}
