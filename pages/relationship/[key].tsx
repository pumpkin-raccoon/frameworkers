import Layout from "components/layout/Layout"
import LoadingModal from "components/LoadingModal"
import RelationshipResultContainer from "containers/RelationshipResultContainer"
import useGetRelationship from "hooks/useGetRelationship"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

const RelationshipResultPage = () => {
  const router = useRouter()
  const {
    relationship,
    isLoading,
    error
  } = useGetRelationship(router.query?.key?.toString() ?? '')
  const name = relationship?.name ?? '나'
  const title = `${name}의 인간관계 | 프레임워커스`
  const description = `${name}님은 과연 어떤 인간관계를 갖고 있을까요? 인간관계 데이터 분석 결과를 살펴보세요!`

  useEffect(() => {
    if (!isLoading && error) {
      router.push('/relationship')
    }
  }, [isLoading, error, router])

  if (isLoading || !relationship) {
    return <LoadingModal open={isLoading}/>
  }
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" property="og:description" content={description} key="description" />
        {/* <meta property="og:image" content={META_DATA.image} key="image" /> */}
        <meta property="og:title" content={title} key="title" />
      </Head>
      <RelationshipResultContainer relationship={relationship} />
    </Layout>
  )
}

export default RelationshipResultPage
