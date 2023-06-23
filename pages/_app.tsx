import SideBar from "@/components/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SideBar>
        <Component {...pageProps} />
      </SideBar>
    </SessionProvider>
  );
}
