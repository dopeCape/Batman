import SideBar from "@/components/NavigationBar/SideBar"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import { useEffect } from "react"
import NavigationBar from "@/components/NavigationBar"
import Footer from "@/components/Footer"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import LoginNavBar from "@/components/LoginNavBar"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {}, [pageProps.session])

  return (
    <>
      <Head>
        <title>Metridash - Never Face Creative Blocks Again!</title>
      </Head>
      <ThemeProvider attribute="class">
        <SessionProvider session={pageProps.session}>
          <NavigationBar>
            <Component {...pageProps} />
          </NavigationBar>
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
