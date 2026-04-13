'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  totalIncome: number
  totalExpense: number
  balance: number
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    const start = prev.current
    const diff  = target - start
    if (diff === 0) return
    const startTime = performance.now()

    function tick(now: number) {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(start + diff * eased))
      if (p < 1) requestAnimationFrame(tick)
      else { setValue(target); prev.current = target }
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return value
}

function Card({ label, value, color, sign, delay }: {
  label: string; value: number; color: string; sign: string; delay: number
}) {
  const displayed = useCountUp(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="rounded-xl p-5 cursor-default"
      style={{ background: '#111827', border: '1px solid #1a1f2e', position: 'relative', overflow: 'hidden' }}
    >
      {/* 상단 컬러 라인 */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: color, opacity: 0.7 }} />

      <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: '#334155' }}>
        {label}
      </p>
      <p className="text-xl font-black tabular-nums" style={{ color }}>
        {sign}{displayed.toLocaleString('ko-KR')}원
      </p>
    </motion.div>
  )
}

export default function SummaryCards({ totalIncome, totalExpense, balance }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card label="INCOME"  value={totalIncome}         color="#10b981" sign="+"  delay={0}    />
      <Card label="EXPENSE" value={totalExpense}        color="#f43f5e" sign="-"  delay={0.07} />
      <Card label="BALANCE" value={Math.abs(balance)}  color={balance >= 0 ? '#3b82f6' : '#f43f5e'} sign={balance < 0 ? '-' : ''} delay={0.14} />
    </div>
  )
}
