import { useRouter } from "next/router"
import { useState } from "react"
import { sendKakaoLink } from "services/kakao"
import { copyTextToClipboard } from "utils/clipboard"

const useShareButtons = (name: string) => {
  const [isToastOpened, setIsToastOpened] = useState(false)
  const router = useRouter()

  const onClickKakaoLink = () => {
    sendKakaoLink({
      title: `${name}님의 인간관계 분석 결과`,
      description: `${name}님은 과연 어떤 인간관계를 갖고 있을까요? 인간관계 데이터 분석 결과를 살펴보세요!`,
      path: router.asPath.replace('/', ''),
      image: '',
    })
  }

  const onClickShareLink = () => {
    copyTextToClipboard(window.location.href)
    setIsToastOpened(true)
  }

  const onCloseToast = () => {
    setIsToastOpened(false)
  }

  return {
    onClickKakaoLink,
    onClickShareLink,
    onCloseToast,
    isToastOpened,
  }
}

export default useShareButtons
