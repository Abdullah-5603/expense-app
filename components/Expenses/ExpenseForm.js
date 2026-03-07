'use client'

import { useState, useEffect } from 'react'

// Icons
const Icons = {
  Food: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
    </svg>
  ),
  Transport: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  ),
  Shopping: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
  Bills: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  ),
  Entertainment: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
    </svg>
  ),
  More: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
  CreditCard: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  ),
  Cash: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
    </svg>
  ),
  Bank: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"/>
    </svg>
  )
}

// Default categories
const defaultCategories = [
  { name: 'Food', icon: Icons.Food, color: 'food' },
  { name: 'Groceries', icon: Icons.Groceries, color: 'groceries' },
  { name: 'Transport', icon: Icons.Transport, color: 'transport' },
  { name: 'Fuel', icon: Icons.Fuel, color: 'fuel' },
  { name: 'Shopping', icon: Icons.Shopping, color: 'shopping' },
  { name: 'Bills', icon: Icons.Bills, color: 'bills' },
  { name: 'Rent', icon: Icons.Rent, color: 'rent' },
  { name: 'Utilities', icon: Icons.Utilities, color: 'utilities' },
  { name: 'Internet', icon: Icons.Internet, color: 'internet' },
  { name: 'Mobile', icon: Icons.Mobile, color: 'mobile' },
  { name: 'Healthcare', icon: Icons.Healthcare, color: 'health' },
  { name: 'Medicine', icon: Icons.Medicine, color: 'medicine' },
  { name: 'Education', icon: Icons.Education, color: 'education' },
  { name: 'Subscriptions', icon: Icons.Subscription, color: 'subscription' },
  { name: 'Entertainment', icon: Icons.Entertainment, color: 'entertainment' },
  { name: 'Travel', icon: Icons.Travel, color: 'travel' },
  { name: 'Gifts', icon: Icons.Gift, color: 'gift' },
  { name: 'Personal Care', icon: Icons.PersonalCare, color: 'personal' },
  { name: 'Insurance', icon: Icons.Insurance, color: 'insurance' },
  { name: 'Savings', icon: Icons.Savings, color: 'savings' },
  { name: 'Investments', icon: Icons.Investment, color: 'investment' },
  { name: 'Taxes', icon: Icons.Taxes, color: 'taxes' },
  { name: 'Pets', icon: Icons.Pets, color: 'pets' },
  { name: 'Charity', icon: Icons.Charity, color: 'charity' },
  { name: 'Other', icon: Icons.More, color: 'other' }
]

// Payment methods
const paymentMethods = [
  { name: 'Cash', icon: Icons.Cash },
  { name: 'Card', icon: Icons.CreditCard },
  { name: 'Bank', icon: Icons.Bank }
]

// ExpenseForm Component
// BEM: .expense-form
// Elements: __group, __label, __input-wrap, __input, __select, __row, __btn
// Modifiers: --primary, --secondary, --danger, --block
export default function ExpenseForm({ 
  onSubmit, 
  initialData = null, 
  isEditing = false, 
  onCancel,
  includeDate = true,
  categories = defaultCategories
}) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Card'
  })
  const [errors, setErrors] = useState({})
  const [categorySearch, setCategorySearch] = useState('')
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        amount: initialData.amount?.toString() || '',
        category: initialData.category || '',
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
        paymentMethod: initialData.paymentMethod || 'Card'
      })
    }
  }, [initialData])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = event.target.closest('.expense-form__select-wrap')
      if (!dropdown && isCategoryDropdownOpen) {
        setIsCategoryDropdownOpen(false)
        setCategorySearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCategoryDropdownOpen])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }
    
    if (!formData.category?.trim()) {
      newErrors.category = 'Category is required'
    }
    
    if (includeDate && !formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    onSubmit?.({
      ...formData,
      amount: parseFloat(formData.amount)
    })

    // Reset form if not editing
    if (!isEditing) {
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Card'
      })
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <style jsx>{`
        .expense-form__select-wrap {
          position: relative;
          width: 100%;
        }
        
        .expense-form__select {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--secondary-color);
          border-radius: 8px;
          background: var(--gray-color);
          color: var(--primary-text);
          font-size: 0.9375rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: border-color 0.2s;
        }
        
        .expense-form__select:hover {
          border-color: var(--primary-color);
        }
        
        .expense-form__select--open {
          border-color: var(--primary-color);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        .expense-form__select-value {
          text-align: left;
          flex: 1;
        }
        
        .expense-form__select-arrow {
          width: 20px;
          height: 20px;
          color: var(--secondary-text);
          transition: transform 0.2s;
        }
        
        .expense-form__select--open .expense-form__select-arrow {
          transform: rotate(180deg);
        }
        
        .expense-form__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          border: 1px solid var(--secondary-color);
          border-top: none;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          background: white;
          box-shadow: var(--shadow);
          z-index: 100;
          max-height: 300px;
          overflow: hidden;
        }
        
        .expense-form__dropdown-search {
          width: 100%;
          padding: 12px;
          border: none;
          border-bottom: 1px solid var(--secondary-color);
          outline: none;
          font-size: 0.875rem;
        }
        
        .expense-form__dropdown-options {
          max-height: 240px;
          overflow-y: auto;
        }
        
        .expense-form__dropdown-option {
          padding: 12px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }
        
        .expense-form__dropdown-option:hover {
          background-color: var(--gray-color);
        }
        
        .expense-form__dropdown-option--active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .expense-form__dropdown-no-results {
          padding: 12px;
          text-align: center;
          color: var(--secondary-text);
          font-size: 0.875rem;
        }
      `}</style>
      {/* Name */}
      <div className="expense-form__group">
        <label className="expense-form__label">Expense Name</label>
        <input
          type="text"
          className={`expense-form__input ${errors.name ? 'expense-form__input--error' : ''}`}
          placeholder="Enter expense name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        {errors.name && <span className="expense-form__error">{errors.name}</span>}
      </div>

      {/* Amount */}
      <div className="expense-form__group">
        <label className="expense-form__label">Amount</label>
        <div className="expense-form__input-wrap">
          <span className="expense-form__prefix">$</span>
          <input
            type="number"
            className={`expense-form__input expense-form__input--has-prefix ${errors.amount ? 'expense-form__input--error' : ''}`}
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            step="0.01"
            min="0.01"
          />
        </div>
        {errors.amount && <span className="expense-form__error">{errors.amount}</span>}
      </div>

      {/* Category Row */}
      <div className="expense-form__row">
        {/* Category */}
        <div className="expense-form__group">
          <label className="expense-form__label">Category</label>
          {/* Searchable Category Dropdown */}
          <div className="expense-form__select-wrap">
            <div 
              className={`expense-form__select ${errors.category ? 'expense-form__input--error' : ''} ${isCategoryDropdownOpen ? 'expense-form__select--open' : ''}`}
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <span className="expense-form__select-value">
                {formData.category || 'Select category'}
              </span>
              <svg className="expense-form__select-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
              </svg>
            </div>
            
            {isCategoryDropdownOpen && (
              <div className="expense-form__dropdown">
                <input
                  type="text"
                  className="expense-form__dropdown-search"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  autoFocus
                />
                <div className="expense-form__dropdown-options">
                  {categories.filter(cat => 
                    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                  ).map(cat => (
                    <div
                      key={cat.name}
                      className={`expense-form__dropdown-option ${formData.category === cat.name ? 'expense-form__dropdown-option--active' : ''}`}
                      onClick={() => {
                        handleChange('category', cat.name)
                        setIsCategoryDropdownOpen(false)
                        setCategorySearch('')
                      }}
                    >
                      {cat.name}
                    </div>
                  ))}
                  
                  {categories.filter(cat => 
                    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                  ).length === 0 && (
                    <div className="expense-form__dropdown-no-results">
                      No categories found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {errors.category && <span className="expense-form__error">{errors.category}</span>}
        </div>

        {/* Date */}
        {includeDate && (
          <div className="expense-form__group">
            <label className="expense-form__label">Date</label>
            <input
              type="date"
              className={`expense-form__input ${errors.date ? 'expense-form__input--error' : ''}`}
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <span className="expense-form__error">{errors.date}</span>}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="expense-form__group">
        <label className="expense-form__label">Payment Method</label>
        <div className="payment-methods">
          {paymentMethods.map(method => (
            <button
              key={method.name}
              type="button"
              className={`payment-methods__option ${formData.paymentMethod === method.name ? 'payment-methods__option--active' : ''}`}
              onClick={() => handleChange('paymentMethod', method.name)}
            >
              <method.icon />
              <span>{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="expense-form__btn expense-form__btn--primary expense-form__btn--block">
        {isEditing ? 'Update Expense' : 'Add Expense'}
      </button>

      {/* Cancel Button (when editing) */}
      {isEditing && onCancel && (
        <button 
          type="button" 
          className="expense-form__btn expense-form__btn--secondary expense-form__btn--block"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  )
}
