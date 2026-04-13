'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from 'chart.js'
import { Entry, formatKRW } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props { entries: Entry[] }

export default function BarChart({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-xs" style={{ color: '#2d3748' }}>
        내역을 추가하면 표시됩니다
      </div>
    )
  }

  const monthSet = new Set(entries.map(e => e.date.slice(0, 7)))
  const months   = Array.from(monthSet).sort().slice(-6)

  const incomeData  = months.map(m =>
    entries.filter(e => e.type === 'income'  && e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0)
  )
  const expenseData = months.map(m =>
    entries.filter(e => e.type === 'expense' && e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0)
  )
  const labels = months.map(m => m.replace('-', '.'))

  return (
    <div className="h-52">
      <Bar
        data={{
          labels,
          datasets: [
            { label: '수입', data: incomeData,  backgroundColor: 'rgba(16,185,129,0.7)',  borderRadius: 4, borderSkipped: false },
            { label: '지출', data: expenseData, backgroundColor: 'rgba(244,63,94,0.7)',   borderRadius: 4, borderSkipped: false },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { size: 11 }, boxWidth: 10, color: '#64748b' },
            },
            tooltip: {
              backgroundColor: '#1e2533',
              titleColor: '#94a3b8',
              bodyColor: '#e2e8f0',
              borderColor: '#2d3748',
              borderWidth: 1,
              callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatKRW(ctx.raw as number)}` },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#4a5568', font: { size: 11 } },
              border: { color: '#1e2533' },
            },
            y: {
              grid: { color: '#1a1f2e' },
              ticks: {
                color: '#4a5568',
                font: { size: 10 },
                callback: v => Number(v) >= 10000 ? (Number(v) / 10000) + '만' : v,
              },
              border: { color: '#1e2533' },
            },
          },
        }}
      />
    </div>
  )
}
