import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from './_components/sidebar'
import { Header } from './_components/header'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              {children}
            </main>
          </div>
        </div>
  )
}
