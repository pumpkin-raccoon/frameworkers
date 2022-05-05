import Layout from "components/layout/Layout"
import RelationshipResultContainer from "containers/RelationshipResultContainer"
import Head from "next/head"

const RelationshipResultPage = () => {
  const name = '홍길동'
  const title = `${name}의 인간관계 | 프레임워커스`
  const description = `${name}님은 과연 어떤 인간관계를 갖고 있을까요? 인간관계 데이터 분석 결과를 살펴보세요!`

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" property="og:description" content={description} key="description" />
        {/* <meta property="og:image" content={META_DATA.image} key="image" /> */}
        <meta property="og:title" content={title} key="title" />
      </Head>
      <RelationshipResultContainer />
    </Layout>
  )
}

export default RelationshipResultPage
