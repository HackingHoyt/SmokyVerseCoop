import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SmokeyVerse Co-op',
  description: 'Built by Hoyt & AGUL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
