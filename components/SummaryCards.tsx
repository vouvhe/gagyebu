import { formatKRW } from '@/types'

interface Props {
  totalIncome: number
  totalExpense: number
  balance: number
}

export default function SummaryCards({ totalIncome, totalExpense, balance }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">총 수입</p>
        <p className="text-xl font-bold text-green-600">{formatKRW(totalIncome)}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">총 지출</p>
        <p className="text-xl font-bold text-red-500">{formatKRW(totalExpense)}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">잔액</p>
        <p className={`text-xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
          {formatKRW(balance)}
        </p>
      </div>
    </div>
  )
}
