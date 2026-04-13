'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Entry, CAT_COLORS, formatKRW } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props { entries: Entry[] }

export default function DonutChart({ entries }: Props) {
  const expenses = entries.filter(e => e.type === 'expense')

  if (expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-xs" style={{ color: '#2d3748' }}>
        지출 내역을 추가하면 표시됩니다
      </div>
    )
  }

  const map: Record<string, number> = {}
  expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + e.amount })
  const labels = Object.keys(map)
  const data   = labels.map(k => map[k])
  const colors = labels.map((_, i) => CAT_COLORS[i % CAT_COLORS.length])

  return (
    <div className="h-52">
      <Doughnut
        data={{
          labels,
          datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#161b27' }],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: { size: 11 },
                boxWidth: 10,
                padding: 10,
                color: '#64748b',
              },
            },
            tooltip: {
              backgroundColor: '#1e2533',
              titleColor: '#94a3b8',
              bodyColor: '#e2e8f0',
              borderColor: '#2d3748',
              borderWidth: 1,
              callbacks: { label: ctx => ` ${ctx.label}: ${formatKRW(ctx.raw as number)}` },
            },
          },
        }}
      />
    </div>
  )
}
