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
    <div className="rounded-xl overflow-hidden" style={{ background: '#161b27', border: '1px solid #1e2533' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #1e2533' }}>
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#4a5568' }}>
          거래 내역
          <span className="ml-2 font-normal normal-case tracking-normal" style={{ color: '#2d3748' }}>
            ({list.length}건)
          </span>
        </p>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as EntryType | 'all')}
          className="text-xs"
          style={{
            background: '#0d1117',
            border: '1px solid #1e2533',
            color: '#94a3b8',
            borderRadius: '6px',
            padding: '4px 10px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="all">전체</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid #1e2533' }}>
            {['날짜', '구분', '항목', '카테고리', '금액', ''].map(h => (
              <th
                key={h}
                className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2d3748' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-14 text-sm" style={{ color: '#2d3748' }}>
                내역이 없습니다.
              </td>
            </tr>
          ) : (
            list.map((e, i) => (
              <tr
                key={e.id}
                style={{
                  borderTop: i > 0 ? '1px solid #1a1f2e' : undefined,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={el => (el.currentTarget.style.background = '#1a1f2e')}
                onMouseLeave={el => (el.currentTarget.style.background = 'transparent')}
              >
                <td className="px-5 py-3 text-sm" style={{ color: '#64748b' }}>{e.date}</td>
                <td className="px-5 py-3">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={
                      e.type === 'income'
                        ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
                        : { background: 'rgba(244,63,94,0.1)', color: '#f43f5e' }
                    }
                  >
                    {e.type === 'income' ? 'IN' : 'OUT'}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: '#e2e8f0' }}>{e.desc}</td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#1e2533', color: '#64748b' }}>
                    {e.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-semibold" style={{ color: e.type === 'income' ? '#10b981' : '#f43f5e' }}>
                  {e.type === 'income' ? '+' : '-'}{formatKRW(e.amount)}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => onDelete(e.id)}
                    className="text-xs transition-colors"
                    style={{ color: '#2d3748', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                    onMouseEnter={el => (el.currentTarget.style.color = '#f43f5e')}
                    onMouseLeave={el => (el.currentTarget.style.color = '#2d3748')}
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
