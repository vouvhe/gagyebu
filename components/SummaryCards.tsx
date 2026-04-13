import { formatKRW } from '@/types'

interface Props {
  totalIncome: number
  totalExpense: number
  balance: number
}

export default function SummaryCards({ totalIncome, totalExpense, balance }: Props) {
  const cards = [
    { label: 'INCOME',  value: formatKRW(totalIncome),  color: '#10b981', sign: '+' },
    { label: 'EXPENSE', value: formatKRW(totalExpense), color: '#f43f5e', sign: '-' },
    { label: 'BALANCE', value: formatKRW(Math.abs(balance)), color: balance >= 0 ? '#3b82f6' : '#f43f5e', sign: balance >= 0 ? '' : '-' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map(c => (
        <div
          key={c.label}
          className="rounded-xl p-5"
          style={{ background: '#161b27', border: '1px solid #1e2533' }}
        >
          <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: '#4a5568' }}>
            {c.label}
          </p>
          <p className="text-xl font-bold truncate" style={{ color: c.color }}>
            {c.sign}{c.value}
          </p>
        </div>
      ))}
    </div>
  )
}
