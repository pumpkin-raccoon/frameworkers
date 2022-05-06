export enum PieChartType {
  Age = 'AGE',
  Intimacy = 'INTIMACY',
  Gender = 'GENDER',
  Category = 'CATEGORY'
}

export const getPieChartTypeText = (type: PieChartType) => {
  switch (type) {
    case PieChartType.Age:
      return '나이'
    case PieChartType.Intimacy:
      return '친밀도'
    case PieChartType.Gender:
      return '성별'
    case PieChartType.Category:
      return '카테고리'
  }
}

export interface VennDiagramSet {
  sets: string[]
  size: number
}

const compareStringArray = (array1: string[], array2: string[]) => {
  if (array1.length > 0 && array1.length !== array2.length) {
    return false
  }
  let isSame = true
  const sortedArray1 = array1.sort()
  const sortedArray2 = array2.sort()
  sortedArray1.forEach((value, index) => {
    if (value !== sortedArray2[index]) {
      isSame = false
      return
    }
  })
  return isSame
}

const addCountOrAppend = (targetSet: string[], originalSets: VennDiagramSet[]) => {
  const returnSets: VennDiagramSet[] = [...originalSets]
  const targetIndex = originalSets.findIndex((set) => compareStringArray(set.sets, targetSet))
  if (targetIndex >= 0) {
    returnSets[targetIndex].size += 1
  } else {
    returnSets.push({ sets: targetSet.sort(), size: 1 })
  }
  return returnSets
}

const getCombinations = (array: string[], selectNumber: number): string[][] => {
  const results: string[][] = [];
  // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return
  if (selectNumber === 1) {
    return array
      .sort()
      .map((element) => [element]); 
  }

  array.forEach((fixed, index, origin) => {
    // 해당하는 fixed를 제외한 나머지 뒤
    const rest = origin.slice(index + 1); 
    // 나머지에 대해서 조합을 구한다.
    const combinations = getCombinations(rest, selectNumber - 1); 
    //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    const attached = combinations.map((element) => [fixed, ...element]); 
    // 배열 spread syntax 로 모두다 push
    results.push(...attached.sort()); 
  });

  return results;
}

const getAllCombinations = (array: string[]) => {
  const results: string[][] = [];
  array.forEach((_, index) => {
    const combinations = getCombinations(array, index + 1);
    results.push(...combinations.sort())
  })
  return results
}

export const getVennDiagramSet = (
  rawData: string[], 
  vennDiagramSets: VennDiagramSet[]
): VennDiagramSet[] => {
  if (rawData.length === 0) {
    return vennDiagramSets
  }
  let targetSets: VennDiagramSet[] = [...vennDiagramSets]
  const allCombinations = getAllCombinations(rawData)
  allCombinations.forEach((combination) => {
    targetSets = addCountOrAppend(combination, targetSets)
  })
  return targetSets
}
