// export default function App({ Component, pageProps }: AppProps) {

//   return (
//     <SessionProvider session={pageProps.session}>
//       <SideBar>
//         <Component {...pageProps} />
//       </SideBar>
//     </SessionProvider>
//   );
// }

import SideBar from "@/components/NavigationBar/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import Head from "next/head";
import { ThemeProvider } from 'next-themes'
import LoginNavBar from "@/components/LoginNavBar";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {}, [pageProps.session]);

  return (
    <>
      <Head>
        <title>Metridash-Say BYE-BYE to creative blocks!</title>
      </Head>
      <ThemeProvider attribute="class">
      <SessionProvider session={pageProps.session}>
        
        <NavigationBar>
          <Component {...pageProps} />
        </NavigationBar>
      </SessionProvider>
      </ThemeProvider>
    </>
  );
}
