import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '가계부',
  description: '개인 수입/지출 관리 가계부',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
