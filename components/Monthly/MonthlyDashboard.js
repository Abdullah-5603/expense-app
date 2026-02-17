'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [monthlyData, setMonthlyData] = useState([])
  
  // All-time stats from API
  const [allTimeStats, setAllTimeStats] = useState({
    totalSpending: 0,
    expenseCount: 0,
    averageExpense: 0
  })

  // Calculate category breakdown
  const categories = [...new Set(expenses.map(e => e.category))]
  const categoryBreakdown = categories.map(cat => ({
    name: cat,
    amount: expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
    count: expenses.filter(e => e.category === cat).length,
    percentage: total > 0 ? (expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0) / total * 100).toFixed(0) : 0
  })).sort((a, b) => b.amount - a.amount)

  const topCategory = categoryBreakdown[0] || null

  // Fetch expenses from API
  const fetchExpenses = useCallback(async (month = selectedMonth, category = selectedCategory) => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('month', month)
      params.append('email', user.email)
      
      // Only add category filter if not "All"
      if (category && category !== 'All') {
        params.append('category', category)
      }
      
      const response = await fetch(`/api/expenses?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data.expenses || [])
        setTotal(data.total || 0)
      } else {
        setExpenses([])
        setTotal(0)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
      setExpenses([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }, [user?.email, selectedMonth, selectedCategory])

  // Initial load and when month/category changes
  useEffect(() => {
    if (user?.email) {
      fetchExpenses(selectedMonth, selectedCategory)
    }
  }, [user?.email, selectedMonth, selectedCategory])

  // Fetch monthly spending data for charts
  const fetchMonthlyData = useCallback(async () => {
    if (!user?.email) return
    
    try {
      const params = new URLSearchParams()
      params.append('email', user.email)
      
      const response = await fetch(`/api/expenses/spending?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setMonthlyData(data.monthlyData || [])
        setAllTimeStats({
          totalSpending: data.totalSpending || 0,
          expenseCount: data.expenseCount || 0,
          averageExpense: data.averageExpense || 0
        })
      }
    } catch (error) {
      console.error('Error fetching monthly data:', error)
    }
  }, [user?.email])

  // Fetch monthly data on mount
  useEffect(() => {
    if (user?.email) {
      fetchMonthlyData()
    }
  }, [user?.email, fetchMonthlyData])

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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
        fetchMonthlyData()
        
        if (result.monthYear !== selectedMonth) {
          setSelectedMonth(result.monthYear)
        }
        
        setIsModalOpen(false)
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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
        fetchMonthlyData()
        setEditingId(null)
        setEditingExpense(null)
        setIsModalOpen(false)
        
        if (result.monthYear !== selectedMonth) {
          setSelectedMonth(result.monthYear)
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
        const result = await response.json()
        setExpenses(result.expenses || [])
        setTotal(result.total || 0)
        fetchMonthlyData()
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

  // Get expense name for delete modal
  const getDeletingExpenseName = () => {
    const expense = expenses.find(e => e._id === deletingId)
    return expense?.name || 'this expense'
  }

  // Filter by search
  const filteredExpenses = searchQuery
    ? expenses.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : expenses

  return (
    <AppLayout
      title={`${selectedMonth} Expenses`}
      user={user}
      onAddExpense={handleAddExpenseClick}
      onLogout={handleLogout}
      showAddButton={true}
    >
      {/* Summary Section with KPI Cards */}
      <SummarySection
        totalExpenses={allTimeStats.totalSpending}
        expenseCount={allTimeStats.expenseCount}
        averageExpense={allTimeStats.averageExpense}
        topCategory={topCategory}
        categories={categoryBreakdown}
        monthlyData={monthlyData}
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
