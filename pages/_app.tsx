import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { META_DATA } from 'constants/meta'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{META_DATA.title}</title>
        <meta name="description" property="og:description" content={META_DATA.description} key="description" />
        {/* <meta property="og:image" content={CODEIT_META.IMG_DIRECTORY} key="image" /> */}
        <meta property="og:title" content={META_DATA.title} key="title" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
