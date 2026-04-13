'use client'

import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Entry, formatKRW } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props { entries: Entry[] }

export default function BarChart({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-xs tracking-widest uppercase"
        style={{ color: '#1e293b' }}>
        No data
      </div>
    )
  }

  const monthSet = new Set(entries.map(e => e.date.slice(0, 7)))
  const months   = Array.from(monthSet).sort().slice(-6)

  const incomeData  = months.map(m =>
    entries.filter(e => e.type === 'income'  && e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0))
  const expenseData = months.map(m =>
    entries.filter(e => e.type === 'expense' && e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0))
  const labels = months.map(m => m.replace('-', '.'))

  return (
    <motion.div
      className="h-52"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      <Bar
        data={{
          labels,
          datasets: [
            { label: 'IN',  data: incomeData,  backgroundColor: 'rgba(16,185,129,0.65)',  borderRadius: 5, borderSkipped: false },
            { label: 'OUT', data: expenseData, backgroundColor: 'rgba(244,63,94,0.65)',   borderRadius: 5, borderSkipped: false },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { font: { size: 11 }, boxWidth: 8, color: '#475569' } },
            tooltip: {
              backgroundColor: '#1a1f2e',
              titleColor: '#64748b',
              bodyColor: '#e2e8f0',
              borderColor: '#2d3748',
              borderWidth: 1,
              padding: 10,
              callbacks: { label: ctx => `  ${ctx.dataset.label}  ${formatKRW(ctx.raw as number)}` },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#334155', font: { size: 11 } },
              border: { color: '#1a1f2e' },
            },
            y: {
              grid: { color: '#0f1520' },
              ticks: {
                color: '#334155', font: { size: 10 },
                callback: v => Number(v) >= 10000 ? (Number(v) / 10000) + 'w' : v,
              },
              border: { color: '#1a1f2e' },
            },
          },
        }}
      />
    </motion.div>
  )
}
