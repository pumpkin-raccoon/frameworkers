/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { META_DATA } from 'constants/meta'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  return (
    <div>
      <Script 
        src="https://d3js.org/d3.v6.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="beforeInteractive"
      />
      <Script id="kakao-sdk">
        {`Kakao.init('17657aadc9aca8d918a2302c05e213ca');`}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{META_DATA.title}</title>
        <meta name="description" property="og:description" content={META_DATA.description} key="description" />
        <meta property="og:image" content={META_DATA.image} key="image" />
        <meta property="og:title" content={META_DATA.title} key="title" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  )
}

export default MyApp
