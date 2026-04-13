'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Entry, EntryType, formatKRW } from '@/types'

interface Props {
  entries: Entry[]
  onDelete: (id: number) => void
}

export default function EntryTable({ entries, onDelete }: Props) {
  const [filter, setFilter] = useState<EntryType | 'all'>('all')

  const list = filter === 'all' ? entries : entries.filter(e => e.type === filter)

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#111827', border: '1px solid #1a1f2e' }}>

      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #1a1f2e' }}>
        <div className="flex items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#334155' }}>
            거래 내역
          </p>
          <motion.span
            key={list.length}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#1a1f2e', color: '#475569' }}
          >
            {list.length}
          </motion.span>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as EntryType | 'all')}
          className="text-xs"
          style={{
            background: '#0d1117', border: '1px solid #1a1f2e', color: '#64748b',
            borderRadius: '6px', padding: '4px 10px', outline: 'none', cursor: 'pointer',
          }}
        >
          <option value="all">전체</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      {/* 테이블 */}
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid #1a1f2e' }}>
            {['날짜', '구분', '항목', '카테고리', '금액', ''].map(h => (
              <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: '#1e293b' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {list.length === 0 ? (
              <motion.tr key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <td colSpan={6} className="text-center py-14 text-xs tracking-widest uppercase"
                  style={{ color: '#1e293b' }}>
                  No transactions yet
                </td>
              </motion.tr>
            ) : (
              list.map((e) => (
                <motion.tr
                  key={e.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: '1px solid #0f1520' }}
                  className="group"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: '#475569' }}>{e.date}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded"
                      style={e.type === 'income'
                        ? { background: 'rgba(16,185,129,0.08)', color: '#10b981' }
                        : { background: 'rgba(244,63,94,0.08)', color: '#f43f5e' }
                      }>
                      {e.type === 'income' ? 'IN' : 'OUT'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium" style={{ color: '#cbd5e1' }}>{e.desc}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: '#0d1117', color: '#475569', border: '1px solid #1a1f2e' }}>
                      {e.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-black tabular-nums"
                    style={{ color: e.type === 'income' ? '#10b981' : '#f43f5e' }}>
                    {e.type === 'income' ? '+' : '-'}{formatKRW(e.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <motion.button
                      onClick={() => onDelete(e.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        color: '#334155', background: 'none', border: '1px solid #1a1f2e',
                        borderRadius: '5px', cursor: 'pointer', padding: '2px 8px',
                      }}
                    >
                      del
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
