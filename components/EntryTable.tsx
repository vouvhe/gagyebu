'use client'

import { useState } from 'react'
import { Entry, EntryType, formatKRW } from '@/types'

interface Props {
  entries: Entry[]
  onDelete: (id: number) => void
}

export default function EntryTable({ entries, onDelete }: Props) {
  const [filter, setFilter] = useState<EntryType | 'all'>('all')

  const list = filter === 'all' ? entries : entries.filter(e => e.type === filter)

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500">거래 내역</h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as EntryType | 'all')}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="all">전체</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-50">
            {['날짜', '구분', '항목', '카테고리', '금액', ''].map(h => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-gray-300 text-sm">
                내역이 없습니다.
              </td>
            </tr>
          ) : (
            list.map(e => (
              <tr key={e.id} className="border-t border-gray-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-600">{e.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    e.type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {e.type === 'income' ? '수입' : '지출'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">{e.desc}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                    {e.category}
                  </span>
                </td>
                <td className={`px-4 py-3 text-sm font-semibold ${
                  e.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {e.type === 'income' ? '+' : '-'}{formatKRW(e.amount)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onDelete(e.id)}
                    className="text-xs text-gray-300 border border-gray-200 rounded-md px-2.5 py-1 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
