interface SendKakaoLinkParams {
  title: string
  description: string
  path: string
}

export const sendKakaoLink = ({
  title,
  description,
  path
}: SendKakaoLinkParams) => {
  (<any>window)?.Kakao?.Link?.sendCustom?.({
    templateId: 76114,
    templateArgs: {
      title,
      description,
      path
    }
  })
}
