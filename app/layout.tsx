import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RoomProvider } from './contexts/RoomContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CUMT Hotel',
  description: 'Hotel management system for CUMT Hotel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoomProvider>
          {children}
        </RoomProvider>
      </body>
    </html>
  )
}

