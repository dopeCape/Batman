import SideBar from "@/components/NavigationBar/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("pageProps.session", pageProps.session);
  }, [pageProps.session]);

  return (
    <SessionProvider session={pageProps.session}>
      <NavigationBar>
        <Component {...pageProps} />
      </NavigationBar>
    </SessionProvider>
  );
}
