interface Framework {
  name: string
  image: string
  description: string
  path: string
  disable: boolean
}

export const FRAMEWORKS: Framework[] = [
  {
    name: '만다라트',
    image: '/images/mandalart.png',
    description: '오타니가 사용한 것으로 유명한 프레임워크로 “인생을 바꾸는 9칸"이라고도 불려요. 여러분의 목표를 만다라트 프레임워크로 정리해 보세요.',
    path: '/',
    disable: true
    
  }, {
    name: '인간관계 다이어그램',
    image: '/images/relation.png',
    description: '나의 인간관계를 데이터로 확인해 보세요. 과연 내 인간관계는 어떤 그래프로 그려질까요?',
    path: '/relationship',
    disable: false,
  }, {
    name: '아이젠하워 매트릭스',
    image: '/images/izen.png',
    description: '가장 효율적으로 일 할 수 있는 방법! 아이젠하워 대통령이 사용했던 것으로도 유명한 시간관리 프레임워크를 사용해 보세요.',
    path: '/',
    disable: true,
  }
]
