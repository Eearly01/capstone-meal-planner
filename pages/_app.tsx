import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import { Roboto } from 'next/font/google'
const roboto = Roboto({weight: '400', subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router
  let showNavbar = true

  if(pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    showNavbar = false
  }

  return (
    <main className={roboto.className}>
      <SessionProvider session={pageProps.session}>
        { showNavbar && <Navbar /> }
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
