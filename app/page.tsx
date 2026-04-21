'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Entry } from '@/types'
import SummaryCards from '@/components/SummaryCards'
import EntryForm from '@/components/EntryForm'
import EntryTable from '@/components/EntryTable'
import DonutChart from '@/components/DonutChart'
import BarChart from '@/components/BarChart'

const STORAGE_KEY = 'gagyebu_entries'

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: easing },
  }),
}

export default function HomePage() {
  const [entries, setEntries]   = useState<Entry[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setEntries(JSON.parse(saved))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries, hydrated])

  /* ── 추가 ── */
  function addEntry(entry: Omit<Entry, 'id'>) {
    const newEntry: Entry = { ...entry, id: Date.now() }
    setEntries(prev => [newEntry, ...prev].sort((a, b) => b.date.localeCompare(a.date)))
  }

  /* ── 삭제 ── */
  function deleteEntry(id: number) {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const totalIncome  = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0)
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0)
  const balance      = totalIncome - totalExpense

  return (
    <div className="min-h-screen relative" style={{ background: '#0d1117' }}>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easing }}
        style={{ borderBottom: '1px solid #1a1f2e' }}
        className="px-6 py-4 relative z-10"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black glow-blue"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', letterSpacing: '-1px' }}>
                V
              </div>
              <div className="absolute inset-0 rounded-lg blur-md opacity-50"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }} />
            </div>
            <div>
              <span className="text-white font-black tracking-[0.2em] text-base">VAULT</span>
              <span className="text-xs ml-2 tracking-widest" style={{ color: '#334155' }}>FINANCE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-wider" style={{ color: '#334155' }}>
              {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </motion.header>

      <main className="max-w-5xl mx-auto px-4 py-7 flex flex-col gap-5 relative z-10">

        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <EntryForm onAdd={addEntry} />
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-xl p-5" style={{ background: '#111827', border: '1px solid #1a1f2e' }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#334155' }}>
              카테고리별 지출
            </p>
            <DonutChart entries={entries} />
          </div>
          <div className="rounded-xl p-5" style={{ background: '#111827', border: '1px solid #1a1f2e' }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#334155' }}>
              월별 수입 / 지출
            </p>
            <BarChart entries={entries} />
          </div>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <EntryTable entries={entries} onDelete={deleteEntry} />
        </motion.div>

      </main>
    </div>
  )
}
