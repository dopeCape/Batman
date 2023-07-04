// import SideBar from "@/components/SideBar";
// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";

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
export default function App({ Component, pageProps }: AppProps) {
  

  useEffect(() => {
    console.log("pageProps.session", pageProps.session);
  }, [pageProps.session]);
  

  return (
    <>
    <Head>
      <title>Metridash-Say BYE-BYE to creative blocks!</title>
    </Head>
    <SessionProvider session={pageProps.session}>
      
      <NavigationBar>
        <Component {...pageProps} />
      </NavigationBar>
    </SessionProvider>
    </>
  );
}