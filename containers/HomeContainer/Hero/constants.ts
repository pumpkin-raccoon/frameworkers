interface Framework {
  name: string
  image: string
  description: string
  path: string
}

export const FRAMEWORKS: Framework[] = [
  {
    name: '만다라트',
    image: '',
    description: '만다라트는 가나다라마바사',
    path: '/'
  }, {
    name: '인간 관계',
    image: '',
    description: '나의 인간관계를 데이터로 확인해 보세요.',
    path: '/relationship'
  }, {
    name: '아이젠하워 매트릭스',
    image: '',
    description: '가장 빠르게 일 할 수 있는 방법.',
    path: '/'
  }
]
