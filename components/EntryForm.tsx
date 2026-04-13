'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { Entry, EntryType, CATEGORIES } from '@/types'

interface Props {
  onAdd: (entry: Omit<Entry, 'id'>) => void
}

const inputStyle = {
  background: '#0d1117',
  border: '1px solid #1e2533',
  color: '#e2e8f0',
  borderRadius: '6px',
  padding: '8px 12px',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
}

export default function EntryForm({ onAdd }: Props) {
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate]         = useState(today)
  const [type, setType]         = useState<EntryType>('expense')
  const [desc, setDesc]         = useState('')
  const [category, setCategory] = useState(CATEGORIES.expense[0])
  const [amount, setAmount]     = useState('')

  useEffect(() => { setCategory(CATEGORIES[type][0]) }, [type])

  function handleSubmit() {
    const parsed = parseInt(amount, 10)
    if (!date)               return alert('날짜를 입력하세요.')
    if (!desc.trim())        return alert('항목명을 입력하세요.')
    if (!parsed || parsed <= 0) return alert('금액을 올바르게 입력하세요.')
    onAdd({ date, type, desc: desc.trim(), category, amount: parsed })
    setDesc('')
    setAmount('')
  }

  function onKeyDown(e: KeyboardEvent) { if (e.key === 'Enter') handleSubmit() }

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: '#161b27', border: '1px solid #1e2533' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4a5568' }}>
        내역 추가
      </p>

      <div className="grid gap-3" style={{ gridTemplateColumns: '130px 100px 1fr 130px 150px auto' }}>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: '#4a5568' }}>날짜</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            onKeyDown={onKeyDown} style={inputStyle} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: '#4a5568' }}>구분</label>
          <select value={type} onChange={e => setType(e.target.value as EntryType)}
            onKeyDown={onKeyDown} style={inputStyle}>
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: '#4a5568' }}>항목명</label>
          <input type="text" value={desc} onChange={e => setDesc(e.target.value)}
            onKeyDown={onKeyDown} placeholder="예) 스타벅스, 지하철" style={inputStyle} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: '#4a5568' }}>카테고리</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={inputStyle}>
            {CATEGORIES[type].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs" style={{ color: '#4a5568' }}>금액 (원)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            onKeyDown={onKeyDown} placeholder="0" min={0} style={inputStyle} />
        </div>

        <div className="flex flex-col justify-end">
          <button
            onClick={handleSubmit}
            className="font-semibold text-sm transition-all"
            style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              cursor: 'pointer',
              height: '36px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#3b82f6')}
          >
            + 추가
          </button>
        </div>
      </div>
    </div>
  )
}
