export type EntryType = 'income' | 'expense'

export interface Entry {
  id: number
  date: string
  type: EntryType
  desc: string
  category: string
  amount: number
}

export const CATEGORIES: Record<EntryType, string[]> = {
  expense: ['식비', '카페/음료', '교통', '쇼핑', '의료/건강', '문화/여가', '통신', '주거/관리비', '기타'],
  income: ['월급', '부수입', '용돈', '투자수익', '기타'],
}

export const CAT_COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6',
  '#8b5cf6', '#f97316', '#14b8a6', '#e879f9', '#84cc16',
]

export function formatKRW(n: number): string {
  return n.toLocaleString('ko-KR') + '원'
}
