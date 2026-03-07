'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const [monthlyData, setMonthlyData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [averageExpense, setAverageExpense] = useState(0)
  const [expenseCount, setExpenseCount] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState(null)
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);

  // Fetch spending data for charts
  const fetchSpendingData = useCallback(async () => {
    if (!user?.email) return
    
    setIsLoading(true)
    try {
      // Fetch monthly income
      const incomeResponse = await fetch(`/api/settings/monthly-income?email=${user.email}`)
      if (incomeResponse.ok) {
        const incomeData = await incomeResponse.json()
        setMonthlyIncome(incomeData.monthlyIncome)
      }
      
      // Fetch spending overview data
      const spendingResponse = await fetch(`/api/expenses/spending?email=${user.email}`)
      if (spendingResponse.ok) {
        const spendingData = await spendingResponse.json()
        setMonthlyData(spendingData.monthlyData || [])
        setCategoryData(spendingData.categoryData || [])
        setTotal(spendingData.totalSpending || 0)
        setAverageExpense(spendingData.averageExpense || 0)
        setExpenseCount(spendingData.expenseCount || 0)
      }
      
      // Fetch current month expenses
      const params = new URLSearchParams()
      params.append('month', selectedMonth)
      params.append('email', user.email)
      
      const response = await fetch(`/api/expenses?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data.expenses || [])
        setCurrentMonthExpenses(data.total || 0)
      } else {
        setExpenses([])
        setCurrentMonthExpenses(0)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setExpenses([])
      setMonthlyData([])
      setCategoryData([])
      setCurrentMonthExpenses(0)
    } finally {
      setIsLoading(false)
    }
  }, [user?.email, selectedMonth])

  useEffect(() => {
    if (user?.email) {
      fetchSpendingData()
    }
  }, [fetchSpendingData, user?.email])

  // Calculate top category from category data
  const topCategory = categoryData.length > 0 ? categoryData[0] : null

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
        // Refresh all data after adding
        await fetchSpendingData()
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
        // Refresh all data after updating
        await fetchSpendingData()
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
        // Refresh all data after deleting
        await fetchSpendingData()
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

  // Filter expenses by search (client-side)
  const filteredExpenses = searchQuery
    ? expenses.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : expenses

  // Show recent 5 expenses
  const recentExpenses = filteredExpenses.slice(0, 5)

  // Handle month change from header
  const handleMonthChange = (month) => {
    setSelectedMonth(month)
  }

  return (
    <AppLayout
      title="Dashboard"
      user={user}
      onAddExpense={handleAddExpenseClick}
      onLogout={handleLogout}
      onMonthChange={handleMonthChange}
      showAddButton={true}
    >
      {/* Summary Section with Dynamic KPI Cards & Charts */}
      <SummarySection
        totalExpenses={total}
        expenseCount={expenseCount}
        averageExpense={averageExpense}
        topCategory={topCategory}
        categories={categoryData}
        monthlyData={monthlyData}
        isLoading={isLoading}
        monthlyIncome={monthlyIncome}
        currentMonthExpenses={currentMonthExpenses}
      />

      {/* Recent Expenses */}
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
          expenses={recentExpenses}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter="All"
          onCategoryChange={() => {}}
          categories={categoryData.map(c => c.name)}
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
