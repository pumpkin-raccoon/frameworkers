import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import HomeContainer from '../containers/HomeContainer'

const Home: NextPage = () => {
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  )
}

export default Home
