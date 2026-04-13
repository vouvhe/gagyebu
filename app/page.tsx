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
    <div className="min-h-screen" style={{ background: '#0d1117' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #1e2533' }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              ₩
            </div>
            <span className="text-white font-semibold tracking-wide">가계부</span>
          </div>
          <span className="text-xs" style={{ color: '#4a5568' }}>
            {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-5">

        <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />

        <EntryForm onAdd={addEntry} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl p-5" style={{ background: '#161b27', border: '1px solid #1e2533' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>
              카테고리별 지출
            </p>
            <DonutChart entries={entries} />
          </div>
          <div className="rounded-xl p-5" style={{ background: '#161b27', border: '1px solid #1e2533' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>
              월별 수입 / 지출
            </p>
            <BarChart entries={entries} />
          </div>
        </div>

        <EntryTable entries={entries} onDelete={deleteEntry} />

      </main>
    </div>
  )
}
