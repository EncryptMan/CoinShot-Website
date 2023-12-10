import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/components/SessionProvider'
import { siteConfig } from '@/site.config'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | ' + siteConfig.title,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/icon-circle.png',
      href: '/icon-circle.png',
    }
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  // console.log(session);


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-800`} suppressHydrationWarning={true}>
        <SessionProvider session={session}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
          {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
