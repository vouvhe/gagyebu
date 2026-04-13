'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { Entry, EntryType, CATEGORIES } from '@/types'

interface Props {
  onAdd: (entry: Omit<Entry, 'id'>) => void
}

export default function EntryForm({ onAdd }: Props) {
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate]         = useState(today)
  const [type, setType]         = useState<EntryType>('expense')
  const [desc, setDesc]         = useState('')
  const [category, setCategory] = useState(CATEGORIES.expense[0])
  const [amount, setAmount]     = useState('')

  useEffect(() => {
    setCategory(CATEGORIES[type][0])
  }, [type])

  function handleSubmit() {
    const parsed = parseInt(amount, 10)
    if (!date)           return alert('날짜를 입력하세요.')
    if (!desc.trim())    return alert('항목명을 입력하세요.')
    if (!parsed || parsed <= 0) return alert('금액을 올바르게 입력하세요.')

    onAdd({ date, type, desc: desc.trim(), category, amount: parsed })
    setDesc('')
    setAmount('')
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-500 mb-4">내역 추가</h2>
      <div className="grid grid-cols-2 md:grid-cols-[130px_100px_1fr_130px_140px_auto] gap-3 items-end">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">날짜</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            onKeyDown={onKeyDown}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">구분</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as EntryType)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">항목명</label>
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="예) 스타벅스, 지하철"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">카테고리</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            {CATEGORIES[type].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">금액 (원)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="0"
            min={0}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 text-sm transition-colors h-[38px] whitespace-nowrap"
        >
          추가
        </button>
      </div>
    </div>
  )
}
