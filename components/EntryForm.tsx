'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Entry, EntryType, CATEGORIES } from '@/types'

interface Props {
  onAdd: (entry: Omit<Entry, 'id'>) => void
}

const inputStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #1a1f2e',
  color: '#e2e8f0',
  borderRadius: '7px',
  padding: '8px 12px',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function EntryForm({ onAdd }: Props) {
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate]         = useState(today)
  const [type, setType]         = useState<EntryType>('expense')
  const [desc, setDesc]         = useState('')
  const [category, setCategory] = useState(CATEGORIES.expense[0])
  const [amount, setAmount]     = useState('')
  const [flash, setFlash]       = useState(false)

  useEffect(() => { setCategory(CATEGORIES[type][0]) }, [type])

  function handleSubmit() {
    const parsed = parseInt(amount, 10)
    if (!date)              return alert('날짜를 입력하세요.')
    if (!desc.trim())       return alert('항목명을 입력하세요.')
    if (!parsed || parsed <= 0) return alert('금액을 올바르게 입력하세요.')
    onAdd({ date, type, desc: desc.trim(), category, amount: parsed })
    setDesc('')
    setAmount('')
    setFlash(true)
    setTimeout(() => setFlash(false), 600)
  }

  function onKeyDown(e: KeyboardEvent) { if (e.key === 'Enter') handleSubmit() }

  return (
    <motion.div
      animate={flash ? { borderColor: type === 'income' ? '#10b981' : '#f43f5e' } : { borderColor: '#1a1f2e' }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-5"
      style={{ background: '#111827', border: '1px solid #1a1f2e' }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#334155' }}>
        내역 추가
      </p>

      <div className="grid gap-3" style={{ gridTemplateColumns: '130px 100px 1fr 130px 150px auto' }}>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wider" style={{ color: '#334155' }}>날짜</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} onKeyDown={onKeyDown} style={inputStyle} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wider" style={{ color: '#334155' }}>구분</label>
          <select value={type} onChange={e => setType(e.target.value as EntryType)} style={inputStyle}>
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wider" style={{ color: '#334155' }}>항목명</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)} onKeyDown={onKeyDown}
            placeholder="예) 스타벅스, 지하철" style={inputStyle} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wider" style={{ color: '#334155' }}>카테고리</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
            {CATEGORIES[type].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-wider" style={{ color: '#334155' }}>금액 (원)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            onKeyDown={onKeyDown} placeholder="0" min={0} style={inputStyle} />
        </div>

        <div className="flex flex-col justify-end">
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="font-bold text-sm text-white"
            style={{
              background: 'linear-gradient(135deg,#3b82f6,#6366f1)',
              border: 'none',
              borderRadius: '7px',
              padding: '0 20px',
              cursor: 'pointer',
              height: '36px',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 16px rgba(99,102,241,0.25)',
            }}
          >
            + ADD
          </motion.button>
        </div>
      </div>

      {/* 성공 플래시 */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl"
            style={{
              background: type === 'income' ? '#10b981' : '#f43f5e',
              transformOrigin: 'left',
              position: 'absolute',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
