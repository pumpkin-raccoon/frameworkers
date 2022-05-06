import { OPTION } from "constants/meta"

const COMMENTS = [
  '지인들을 어디서 만났는지(ex. 대학교/동아리), 성별, 친밀도 등을 기준으로 분류해서 시각화할 수 있어요.',
  '지인을 분류하고 다이어그램으로 시각화해 볼 수 있어요. 아주 흥미로울 거예요!'
]

export const RELATIONSHIP_COMMENTS = OPTION.hasInstagramFeature
  ? COMMENTS.push('내가 인스타그램에서 팔로우하는 친구 목록을 불러와 분석해 볼 수 있어요.')
  : COMMENTS
