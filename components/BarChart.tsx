'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Entry, formatKRW } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props {
  entries: Entry[]
}

export default function BarChart({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-gray-300 text-sm">
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

  const labels = months.map(m => {
    const [y, mo] = m.split('-')
    return `${y}.${mo}`
  })

  return (
    <div className="h-52">
      <Bar
        data={{
          labels,
          datasets: [
            { label: '수입', data: incomeData,  backgroundColor: '#86efac', borderRadius: 6 },
            { label: '지출', data: expenseData, backgroundColor: '#fca5a5', borderRadius: 6 },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { size: 11 }, boxWidth: 12 },
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${formatKRW(ctx.raw as number)}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 } },
            },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: {
                font: { size: 10 },
                callback: v => Number(v) >= 10000 ? (Number(v) / 10000) + '만' : v,
              },
            },
          },
        }}
      />
    </div>
  )
}
