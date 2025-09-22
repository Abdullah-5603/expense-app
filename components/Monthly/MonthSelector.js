'use client'

import { useState, useEffect } from 'react'
import { formatMonthYear, getCurrentMonthYear } from '@/utils/helper'

export default function MonthSelector({ selectedMonth, onMonthChange, availableMonths }) {
  const [months, setMonths] = useState([])

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await fetch('/api/expenses/months')
        if (response.ok) {
          const { months: availableMonths } = await response.json()
          setMonths(availableMonths)
        }
      } catch (error) {
        console.error('Error fetching months:', error)
      }
    }
    fetchMonths()
  }, [])

  const handlePrevious = () => {
    if (months.length > 0) {
      const currentIndex = months.indexOf(selectedMonth)
      if (currentIndex < months.length - 1) {
        onMonthChange(months[currentIndex + 1])
      }
    }
  }

  const handleNext = () => {
    if (months.length > 0) {
      const currentIndex = months.indexOf(selectedMonth)
      if (currentIndex > 0) {
        onMonthChange(months[currentIndex - 1])
      }
    }
  }

  const handleMonthChange = (e) => {
    onMonthChange(e.target.value)
  }

  return (
    <div className="month-selector">
      <button className={`month-selector__button ${(!months.length || months.indexOf(selectedMonth) >= months.length - 1) && 'month-selector__button--disabled'}`} onClick={handlePrevious} disabled={!months.length || months.indexOf(selectedMonth) >= months.length - 1}>
        ←
      </button>
      
      <select className='month-selector__select' value={selectedMonth} onChange={handleMonthChange}>
        {months.map(month => (
          <option key={month} value={month}>
            {formatMonthYear(month)}
          </option>
        ))}
        {!months.includes(getCurrentMonthYear()) && (
          <option value={getCurrentMonthYear()}>{formatMonthYear(getCurrentMonthYear())}</option>
        )}
      </select>
      
      <button className={`month-selector__button ${ (!months.length || months.indexOf(selectedMonth) <= 0) && 'month-selector__button--disabled'}`} onClick={handleNext} disabled={!months.length || months.indexOf(selectedMonth) <= 0}>
        →
      </button>
    </div>
  )
}