import { useState } from "react"
import { sendKakaoLink } from "services/kakao"
import { copyTextToClipboard } from "utils/clipboard"

const useShareButtons = (name: string) => {
  const [isToastOpened, setIsToastOpened] = useState(false)

  const onClickKakaoLink = () => {
    sendKakaoLink({
      title: '테스트하기',
      description: '테스트하기이',
      path: window.location.href,
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
