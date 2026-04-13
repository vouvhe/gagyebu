'use client'

import { useState, useEffect } from 'react'
import { Entry, formatKRW } from '@/types'
import SummaryCards from '@/components/SummaryCards'
import EntryForm from '@/components/EntryForm'
import EntryTable from '@/components/EntryTable'
import DonutChart from '@/components/DonutChart'
import BarChart from '@/components/BarChart'

const STORAGE_KEY = 'gagyebu_entries'

export default function HomePage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setEntries(JSON.parse(saved))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries, hydrated])

  function addEntry(entry: Omit<Entry, 'id'>) {
    setEntries(prev =>
      [...prev, { ...entry, id: Date.now() }].sort((a, b) =>
        b.date.localeCompare(a.date)
      )
    )
  }

  function deleteEntry(id: number) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const totalIncome  = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0)
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0)
  const balance      = totalIncome - totalExpense

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-5 shadow-md">
        <h1 className="text-2xl font-bold tracking-tight">가계부</h1>
        <p className="text-blue-200 text-sm mt-0.5">수입과 지출을 한눈에 관리하세요</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Summary */}
        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />

        {/* Form */}
        <EntryForm onAdd={addEntry} />

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">카테고리별 지출</h2>
            <DonutChart entries={entries} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">월별 수입 / 지출</h2>
            <BarChart entries={entries} />
          </div>
        </div>

        {/* Table */}
        <EntryTable entries={entries} onDelete={deleteEntry} />

      </main>
    </div>
  )
}
