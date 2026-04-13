import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VAULT — 자산 관리',
  description: '심플하고 강력한 개인 수입/지출 관리',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
