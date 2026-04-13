'use client'

import { motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Entry, CAT_COLORS, formatKRW } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props { entries: Entry[] }

export default function DonutChart({ entries }: Props) {
  const expenses = entries.filter(e => e.type === 'expense')

  if (expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-xs tracking-widest uppercase"
        style={{ color: '#1e293b' }}>
        No data
      </div>
    )
  }

  const map: Record<string, number> = {}
  expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount })
  const labels = Object.keys(map)
  const data   = labels.map(k => map[k])
  const colors = labels.map((_, i) => CAT_COLORS[i % CAT_COLORS.length])

  return (
    <motion.div
      className="h-52"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Doughnut
        data={{
          labels,
          datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#111827', hoverBorderColor: '#111827' }],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              position: 'right',
              labels: { font: { size: 11 }, boxWidth: 8, padding: 12, color: '#475569' },
            },
            tooltip: {
              backgroundColor: '#1a1f2e',
              titleColor: '#64748b',
              bodyColor: '#e2e8f0',
              borderColor: '#2d3748',
              borderWidth: 1,
              padding: 10,
              callbacks: { label: ctx => `  ${ctx.label}  ${formatKRW(ctx.raw as number)}` },
            },
          },
        }}
      />
    </motion.div>
  )
}
