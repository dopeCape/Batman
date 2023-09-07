import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  let GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <Html lang="en">
      <Head>
        <script 
          async
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        />
        <script  
          dangerouslySetInnerHTML={{
              __html:`
              window.dataLayer = window.dataLayer ||  [];
              function gtag(){dataLayer.push(arguments);}
              gtag('config','${GTM_ID}', {
                page_path: window.location.pathname,
              }),
        `,
          }}
        >

        </script>

      </Head>
     
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
