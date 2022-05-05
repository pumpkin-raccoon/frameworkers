interface SendKakaoLinkParams {
  title: string
  description: string
  image: string
  path: string
}

export const sendKakaoLink = ({
  title,
  description,
  image,
  path
}: SendKakaoLinkParams) => {
  (<any>window)?.Kakao?.Link?.sendCustom?.({
    templateId: 76114,
    templateArgs: {
      title,
      description,
      image,
      path
    }
  })
}
